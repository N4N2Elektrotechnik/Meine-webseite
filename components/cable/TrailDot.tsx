/**
 * Ankerpunkt für CableTrail (Unterseiten). Reines Server-Markup ohne
 * Hooks — CableTrail liest jedes `[data-trail-dot]` einmalig per
 * getBoundingClientRect aus und setzt `data-trail-active`, sobald der
 * Funke den Punkt erreicht. Positioniert wird der Punkt per className
 * (absolut zum nächsten `relative`-Elternelement), damit der Kabelverlauf
 * direkt aus dem Layout entsteht und nie über Text/Formulare läuft.
 */
export function TrailDot({
  className = "",
  terminal = false,
}: {
  className?: string;
  terminal?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      data-trail-dot
      className={`trail-dot ${terminal ? "trail-dot--terminal" : ""} ${className}`}
    />
  );
}
