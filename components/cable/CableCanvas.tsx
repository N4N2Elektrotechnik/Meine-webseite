"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Zeichnet das Kabel als einen SVG-Pfad durch alle `[data-cable-dot]`
 * Ankerpunkte (Hero-Ursprung → Über-uns → 10 Leistungen → Kontakt) und
 * koppelt den gezeichneten Anteil sowie den "Funken" direkt an die
 * aktuelle Scroll-Position — siehe Kabellauf-Blueprint §05.
 *
 * Kernidee: Nicht der rohe Scroll-Fortschritt (0–1 über die ganze Seite)
 * bestimmt die Position des Funkens, sondern die tatsächliche Dokument-
 * Y-Position der Viewport-Mitte. Dafür wird per Lookup-Tabelle der Punkt auf
 * dem Pfad gesucht (einmal berechnete Tabelle + Binärsuche pro Frame),
 * dessen Y-Koordinate der Viewport-Mitte entspricht
 * (Pfad ist von Natur aus Y-monoton, da Knoten von oben nach unten
 * angeordnet sind). Dadurch bleibt der Funke immer ungefähr vertikal
 * zentriert im sichtbaren Bereich, statt bei langem Restscroll (z. B.
 * durch Abschnitte ohne eigene Kabel-Knoten) aus dem Bild zu laufen —
 * und liegt dabei zwingend auf dem echten Kabelpfad.
 *
 * Rein imperativ über Refs/DOM-Attribute — keine React-Re-Renders
 * während des Scrollens. Pfad wird aus echten Layout-Positionen berechnet
 * (nicht hart kodiert), dadurch automatisch desktop-/mobiltauglich.
 */

/** Anteil der Viewport-Höhe, an dem der Funke gehalten wird (0 = oben, 1 = unten). */
const VIEWPORT_ANCHOR = 0.45;

export function CableCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const gradientId = useId();
  const glowId = useId();

  useEffect(() => {
    const svg = svgRef.current;
    const basePath = basePathRef.current;
    const drawPath = drawPathRef.current;
    const spark = sparkRef.current;
    const container = svg?.parentElement;
    if (!svg || !basePath || !drawPath || !container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cumulativeLengths: number[] = [];
    let totalLength = 0;
    let pathStartY = 0;
    let pathEndY = 0;
    // Lookup-Tabelle des Pfads (Y → Länge/X), einmal in build() berechnet.
    // Ersetzt die frühere Bisektion mit ~15 getPointAtLength()-Aufrufen pro
    // Scroll-Frame — die waren auf schwachen Geräten die Hauptursache für
    // Ruckeln (jeder Aufruf misst den Pfad neu durch).
    let tableX = new Float32Array(0);
    let tableY = new Float32Array(0);
    let tableL = new Float32Array(0);
    let foundLen = 0;
    let foundX = 0;
    let foundY = 0;
    let st: ScrollTrigger | undefined;
    // Im Scroll-Handler wiederverwendete Knotenliste — nicht bei jedem
    // Scroll-Frame per querySelectorAll neu ermitteln (siehe update()).
    let cachedNodes: HTMLElement[] = [];

    function getNodes() {
      return Array.from(
        container!.querySelectorAll<HTMLElement>("[data-cable-dot]")
      );
    }

    function build() {
      const nodes = getNodes();
      cachedNodes = nodes;
      if (nodes.length < 2) return;

      const containerRect = container!.getBoundingClientRect();
      const width = container!.clientWidth;
      const height = container!.scrollHeight;

      const points = nodes.map((node) => {
        const r = node.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      });

      svg!.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg!.setAttribute("width", String(width));
      svg!.setAttribute("height", String(height));

      // Sanfte S-Kurven zwischen den Ankerpunkten — Kontrollpunkte auf
      // Höhe der jeweiligen X-Position, dadurch bleibt der Pfad zwischen
      // zwei Knoten horizontal begrenzt (kein Ausbrechen in fremde Spalten).
      const segments = [`M ${points[0].x} ${points[0].y}`];
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dy = (curr.y - prev.y) / 2;
        segments.push(
          `C ${prev.x} ${prev.y + dy}, ${curr.x} ${curr.y - dy}, ${curr.x} ${curr.y}`
        );
      }
      const d = segments.join(" ");
      basePath!.setAttribute("d", d);
      drawPath!.setAttribute("d", d);

      totalLength = drawPath!.getTotalLength();
      pathStartY = points[0].y;
      pathEndY = points[points.length - 1].y;
      const step = Math.max(6, totalLength / 1500);
      const count = Math.ceil(totalLength / step) + 1;
      tableX = new Float32Array(count);
      tableY = new Float32Array(count);
      tableL = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const len = Math.min(i * step, totalLength);
        const p = drawPath!.getPointAtLength(len);
        tableX[i] = p.x;
        tableY[i] = p.y;
        tableL[i] = len;
      }

      // Kumulierte Pfadlänge je Ankerpunkt, um Knoten exakt beim
      // Erreichen durch das gezeichnete Kabel zu aktivieren.
      cumulativeLengths = [0];
      const measurer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      let acc = segments[0];
      for (let i = 1; i < segments.length; i++) {
        acc += " " + segments[i];
        measurer.setAttribute("d", acc);
        cumulativeLengths.push(measurer.getTotalLength());
      }

      if (reduceMotion) {
        drawPath!.style.strokeDasharray = "none";
        drawPath!.style.strokeDashoffset = "0";
        nodes.forEach((node) => {
          node.dataset.cableActive = "true";
        });
        if (spark) spark.style.opacity = "0";
      } else {
        drawPath!.style.strokeDasharray = `${totalLength}`;
        drawPath!.style.strokeDashoffset = `${totalLength}`;
      }
    }

    // Binärsuche über die Lookup-Tabelle: Pfadlänge (foundLen) und Punkt
    // (foundX/foundY), an dem die Y-Koordinate targetY erreicht. Der Pfad
    // ist Y-monoton (Knoten liegen von oben nach unten), daher genügt eine
    // Suche im Array — ohne DOM-Aufruf.
    function locate(targetY: number) {
      let lo = 0;
      let hi = tableY.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (tableY[mid] < targetY) lo = mid + 1;
        else hi = mid;
      }
      if (lo === 0) {
        foundLen = tableL[0];
        foundX = tableX[0];
        foundY = tableY[0];
        return;
      }
      const span = tableY[lo] - tableY[lo - 1];
      const t = span > 0 ? (targetY - tableY[lo - 1]) / span : 1;
      foundLen = tableL[lo - 1] + (tableL[lo] - tableL[lo - 1]) * t;
      foundX = tableX[lo - 1] + (tableX[lo] - tableX[lo - 1]) * t;
      foundY = targetY;
    }

    function update() {
      if (totalLength <= 0) return;

      const containerRect = container!.getBoundingClientRect();
      // Dokument-Y der Viewport-Ankerlinie, im selben Koordinatensystem
      // wie der Pfad (relativ zur linken/oberen Ecke von <main>).
      const anchorDocY = -containerRect.top + window.innerHeight * VIEWPORT_ANCHOR;

      const last = tableY.length - 1;
      let targetLength: number;
      if (anchorDocY <= pathStartY) {
        targetLength = 0;
        foundX = tableX[0];
        foundY = tableY[0];
      } else if (anchorDocY >= pathEndY) {
        targetLength = totalLength;
        foundX = tableX[last];
        foundY = tableY[last];
      } else {
        locate(anchorDocY);
        targetLength = foundLen;
      }

      drawPath!.style.strokeDashoffset = `${totalLength - targetLength}`;

      if (spark) {
        spark.setAttribute("cx", String(foundX));
        spark.setAttribute("cy", String(foundY));
        spark.style.opacity = targetLength > 0.5 ? "1" : "0";
      }

      cachedNodes.forEach((node, i) => {
        const threshold = cumulativeLengths[i] ?? Infinity;
        const isActive = targetLength >= threshold - 4;
        const wasActive = node.dataset.cableActive === "true";
        if (isActive !== wasActive) {
          node.dataset.cableActive = isActive ? "true" : "false";
        }
      });
    }

    build();

    if (!reduceMotion) {
      st = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: update,
      });
      update();
    }

    let resizeTimer: number;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        ScrollTrigger.refresh();
      }, 200);
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      st?.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5]"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-strong)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
        <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.5"
            floodColor="#fbb400"
            floodOpacity="0.4"
          />
        </filter>
      </defs>
      <path
        ref={basePathRef}
        fill="none"
        stroke="var(--color-navy-soft)"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        ref={drawPathRef}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />
      <circle
        ref={sparkRef}
        r="5"
        fill="var(--color-spark)"
        style={{ opacity: 0, filter: `url(#${glowId})` }}
      />
    </svg>
  );
}
