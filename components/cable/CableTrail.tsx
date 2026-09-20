"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wiederverwendbares N4N2-Kabel für die Unterseiten. Liest alle
 * `[data-trail-dot]`-Anker der umgebenden Seite (Elternelement, i. d. R.
 * `<main className="relative">`), verbindet sie zu einem SVG-Pfad und
 * koppelt gezeichneten Anteil + Funke an die Scroll-Position.
 *
 * Der Verlauf ergibt sich aus der Lage der Anker (siehe TrailDot):
 * /leistungen webt zwischen den Leistungen, die übrigen Seiten führen das
 * Kabel als gerade Schiene am Inhaltsrand bzw. in der Spaltenlücke.
 *
 * Performance-Prinzipien (Scroll-Ruckeln war ein bekanntes Problem):
 * - Kein React-State, keine Re-Renders — rein imperativ über Refs.
 * - Pro Scroll-Frame KEINE DOM-Messung: Container-Position, Viewport-Höhe
 *   und eine Lookup-Tabelle (Y → Pfadlänge/X) werden nur beim Aufbau
 *   berechnet. Der Frame besteht aus einer Binärsuche über ein Array und
 *   wenigen Style-Writes.
 * - Kein SVG-/CSS-Filter. Das Glühen ist ein zweiter, breiter Strich mit
 *   geringer Deckkraft; der Funke ist ein eigenes, per transform
 *   bewegtes (compositor-only) Element mit statischem Schatten.
 * - Ein einziger ScrollTrigger je Instanz, per gsap.context + kill() und
 *   Observer-Disconnect vollständig aufgeräumt.
 * - prefers-reduced-motion: statisches, vollständiges Kabel ohne Funke.
 * - Schwache Geräte (≤4 Kerne, ≤4 GB RAM, Datensparmodus): gröbere
 *   Abtastung, kein Glow-Strich, leichterer Funke.
 */

/** Anteil der Viewport-Höhe, an dem der Funke gehalten wird (0 = oben). */
const DEFAULT_ANCHOR = 0.45;
const NODE_SELECTOR = "[data-trail-dot]";
/** Toleranz in px, ab der ein Knoten als "erreicht" gilt. */
const ACTIVATE_TOLERANCE = 6;

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function CableTrail({
  tone = "light",
  anchor = DEFAULT_ANCHOR,
}: {
  /** "dark" für Abschnitte auf Deep-Navy-Hintergrund. */
  tone?: "light" | "dark";
  anchor?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const base = baseRef.current;
    const halo = haloRef.current;
    const draw = drawRef.current;
    const spark = sparkRef.current;
    const container = root?.parentElement;
    if (!root || !svg || !base || !halo || !draw || !spark || !container) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hints = navigator as NavigatorHints;
    const lite =
      (hints.hardwareConcurrency ?? 8) <= 4 ||
      (hints.deviceMemory ?? 8) <= 4 ||
      hints.connection?.saveData === true;
    root.dataset.lite = lite ? "true" : "false";

    /** Startet eine komplette Instanz und liefert deren Aufräum-Funktion. */
    function start(): () => void {
      const reduceMotion = reduceQuery.matches;

      let nodes: HTMLElement[] = [];
      let nodeYs: number[] = [];
      // Lookup-Tabelle des Pfads (nach Y sortiert, da Anker von oben nach
      // unten verlaufen): Y → Pfadlänge / X.
      let xs = new Float32Array(0);
      let ys = new Float32Array(0);
      let ls = new Float32Array(0);
      let total = 0;
      let containerTop = 0;
      let viewportHeight = 0;

      let activeCount = 0;
      let lastLen = -1;
      let shown = false;
      let disposed = false;
      let st: ScrollTrigger | undefined;
      let resizeTimer = 0;
      let firstObserverCall = true;

      function setShown(next: boolean) {
        if (next === shown) return;
        shown = next;
        draw!.style.visibility = next ? "visible" : "hidden";
        halo!.style.visibility = next ? "visible" : "hidden";
        spark!.style.opacity = next ? "1" : "0";
      }

      function build() {
        const found = Array.from(
          container!.querySelectorAll<HTMLElement>(NODE_SELECTOR)
        );
        for (const node of found) delete node.dataset.trailActive;
        activeCount = 0;
        lastLen = -1;

        if (found.length < 2) {
          nodes = [];
          nodeYs = [];
          total = 0;
          base!.removeAttribute("d");
          halo!.removeAttribute("d");
          draw!.removeAttribute("d");
          setShown(false);
          return;
        }

        const containerRect = container!.getBoundingClientRect();
        const width = container!.clientWidth;
        const height = container!.scrollHeight;
        containerTop = containerRect.top + window.scrollY;
        viewportHeight = window.innerHeight;

        const items = found
          .map((node) => {
            const r = node.getBoundingClientRect();
            return {
              node,
              x: r.left + r.width / 2 - containerRect.left,
              y: r.top + r.height / 2 - containerRect.top,
            };
          })
          .sort((a, b) => a.y - b.y);
        nodes = items.map((item) => item.node);
        nodeYs = items.map((item) => item.y);

        svg!.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg!.setAttribute("width", String(width));
        svg!.setAttribute("height", String(height));

        // Sanfte S-Kurven mit vertikalen Tangenten: bei gleicher X-Lage
        // exakt eine Gerade (Schiene), bei versetzten Ankern ein
        // Kabel, das zwischen den Spalten "webt". Y-monoton.
        const segments = [`M ${items[0].x} ${items[0].y}`];
        for (let i = 1; i < items.length; i++) {
          const prev = items[i - 1];
          const curr = items[i];
          const dy = (curr.y - prev.y) / 2;
          segments.push(
            `C ${prev.x} ${prev.y + dy}, ${curr.x} ${curr.y - dy}, ${curr.x} ${curr.y}`
          );
        }
        const d = segments.join(" ");
        base!.setAttribute("d", d);
        halo!.setAttribute("d", d);
        draw!.setAttribute("d", d);

        total = draw!.getTotalLength();
        const step = Math.max(lite ? 14 : 8, total / 1200);
        const count = Math.ceil(total / step) + 1;
        xs = new Float32Array(count);
        ys = new Float32Array(count);
        ls = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          const len = Math.min(i * step, total);
          const p = draw!.getPointAtLength(len);
          xs[i] = p.x;
          ys[i] = p.y;
          ls[i] = len;
        }

        for (const el of [draw!, halo!]) {
          el.style.strokeDasharray = `${total}`;
          el.style.strokeDashoffset = reduceMotion ? "0" : `${total}`;
        }

        if (reduceMotion) {
          for (const node of nodes) node.dataset.trailActive = "true";
          draw!.style.visibility = "visible";
          halo!.style.visibility = "visible";
          spark!.style.opacity = "0";
          shown = true;
        } else {
          shown = true; // erzwingt sauberes Zurücksetzen in setShown
          setShown(false);
        }
      }

      // Ergebnis der letzten Suche (vermeidet Objekt-Allokationen pro Frame).
      let foundLen = 0;
      let foundX = 0;
      let foundY = 0;

      /** Binärsuche: erster Tabellenindex mit ys[i] >= targetY. */
      function locate(targetY: number) {
        let lo = 0;
        let hi = ys.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (ys[mid] < targetY) lo = mid + 1;
          else hi = mid;
        }
        if (lo === 0) {
          foundLen = ls[0];
          foundX = xs[0];
          foundY = ys[0];
          return;
        }
        const span = ys[lo] - ys[lo - 1];
        const t = span > 0 ? (targetY - ys[lo - 1]) / span : 1;
        foundLen = ls[lo - 1] + (ls[lo] - ls[lo - 1]) * t;
        foundX = xs[lo - 1] + (xs[lo] - xs[lo - 1]) * t;
        foundY = targetY;
      }

      function update(scrollY: number) {
        if (total <= 0 || reduceMotion) return;

        const anchorY = scrollY + viewportHeight * anchor - containerTop;
        const last = ys.length - 1;
        let len: number;
        if (anchorY <= ys[0]) {
          len = 0;
          foundX = xs[0];
          foundY = ys[0];
        } else if (anchorY >= ys[last]) {
          len = total;
          foundX = xs[last];
          foundY = ys[last];
        } else {
          locate(anchorY);
          len = foundLen;
        }

        len = Math.round(len * 2) / 2;
        if (len === lastLen) return;
        lastLen = len;

        setShown(len > 0.5);
        if (shown) {
          const offset = `${total - len}`;
          draw!.style.strokeDashoffset = offset;
          halo!.style.strokeDashoffset = offset;
          spark!.style.transform = `translate3d(${foundX - 5}px, ${foundY - 5}px, 0)`;
        }

        // Knoten nur bei tatsächlichem Wechsel anfassen (Zeiger statt Schleife).
        while (
          activeCount < nodes.length &&
          anchorY >= nodeYs[activeCount] - ACTIVATE_TOLERANCE
        ) {
          nodes[activeCount].dataset.trailActive = "true";
          activeCount++;
        }
        while (
          activeCount > 0 &&
          anchorY < nodeYs[activeCount - 1] - ACTIVATE_TOLERANCE
        ) {
          activeCount--;
          nodes[activeCount].dataset.trailActive = "false";
        }
      }

      const ctx = gsap.context(() => {
        build();
        if (!reduceMotion) {
          st = ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => update(self.scroll()),
            onRefresh: (self) => {
              viewportHeight = window.innerHeight;
              update(self.scroll());
            },
          });
          update(st.scroll());
        }
      });

      function rebuild() {
        if (disposed) return;
        build();
        if (st) {
          st.refresh();
          update(st.scroll());
        }
      }

      // Layout-Änderungen (Resize, Schriften, Bewertungen laden, …).
      const observer = new ResizeObserver(() => {
        if (firstObserverCall) {
          firstObserverCall = false;
          return;
        }
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(rebuild, 180);
      });
      observer.observe(container!);

      document.fonts?.ready.then(rebuild);

      return () => {
        disposed = true;
        observer.disconnect();
        window.clearTimeout(resizeTimer);
        ctx.revert(); // killt den ScrollTrigger dieser Instanz
        for (const node of nodes) delete node.dataset.trailActive;
      };
    }

    let teardown = start();
    function handleMotionChange() {
      teardown();
      teardown = start();
    }
    reduceQuery.addEventListener("change", handleMotionChange);

    return () => {
      reduceQuery.removeEventListener("change", handleMotionChange);
      teardown();
    };
  }, [anchor]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-trail-tone={tone}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg ref={svgRef} className="trail-svg" fill="none">
        <path ref={baseRef} className="trail-base" strokeLinecap="round" />
        <path ref={haloRef} className="trail-halo" strokeLinecap="round" />
        <path ref={drawRef} className="trail-draw" strokeLinecap="round" />
      </svg>
      <div ref={sparkRef} className="trail-spark" />
    </div>
  );
}
