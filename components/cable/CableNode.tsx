/**
 * Ankerpunkt für den Kabelverlauf (Phase 4: CableCanvas liest jeden
 * `[data-cable-dot]` per getBoundingClientRect aus, um den SVG-Pfad zu
 * bauen — siehe Kabellauf-Blueprint §05). Der Punkt bleibt auf allen
 * Displaygrößen messbar im DOM; Verbindungslinie und Label sind ab `sm`
 * sichtbar, damit das Layout auf kleinen Screens ruhig bleibt.
 */
export function CableNode({
  side = "left",
  label,
}: {
  side?: "left" | "right";
  label?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 ${
        side === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span
        data-cable-dot
        className="relative flex h-3 w-3 flex-none items-center justify-center rounded-full bg-gold shadow-[0_0_0_4px_var(--color-gold-soft)]"
      >
        <span className="absolute h-1.5 w-1.5 rounded-full bg-navy-strong" />
      </span>
      <span
        className={`hidden h-px w-10 flex-none bg-gradient-to-r from-gold/70 to-gold/0 sm:block ${
          side === "right" ? "rotate-180" : ""
        }`}
      />
      {label ? (
        <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:inline">
          {label}
        </span>
      ) : null}
    </div>
  );
}
