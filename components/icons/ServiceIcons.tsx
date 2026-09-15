import type { ReactElement } from "react";
import type { Service } from "@/lib/placeholder-data";

/**
 * Handgezeichnetes, einheitliches Line-Icon-Set (kein Icon-Paket) —
 * 28x28, stroke-basiert, currentColor, ein Icon je Leistung.
 */
type IconProps = { className?: string };

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Plug({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <path d="M9 3v6M19 3v6" />
      <path d="M7 9h14v5a7 7 0 0 1-7 7v0a7 7 0 0 1-7-7V9Z" />
      <path d="M14 21v4" />
    </svg>
  );
}

function Renovate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <path d="M6 14a8 8 0 0 1 13.6-5.7M22 14a8 8 0 0 1-13.6 5.7" />
      <path d="M19.6 8.3 22 8l-.3 2.4M8.4 19.7 6 20l.3-2.4" />
      <path d="M14 10.5 11.5 14h2.2L11.5 17.5" />
    </svg>
  );
}

function Diagnose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M17.3 17.3 24 24" />
      <path d="M9 13.5 11 10l1.6 3.4L14.6 9l1.4 4.5" />
    </svg>
  );
}

function Distribution({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <rect x="5" y="3.5" width="18" height="21" rx="1.5" />
      <path d="M9.5 8v5M14 8v5M18.5 8v5" />
      <rect x="8" y="8" width="3" height="5" rx="0.6" />
      <rect x="12.5" y="8" width="3" height="5" rx="0.6" />
      <rect x="17" y="8" width="3" height="5" rx="0.6" />
      <path d="M8.5 18.5h11" />
      <path d="M8.5 21.5h7" />
    </svg>
  );
}

function SmartHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <path d="M5 13 14 5l9 8" />
      <path d="M7.5 11.5V23h13V11.5" />
      <circle cx="14" cy="17" r="2.2" />
      <path d="M14 5.5V3M11.5 15.2 9.5 13M16.5 15.2l2-2.2" />
    </svg>
  );
}

function Solar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <circle cx="14" cy="8" r="3" />
      <path d="M14 2.5V4M8.5 5.5l1 1M19.5 5.5l-1 1" />
      <path d="M4 22h20" />
      <path d="M6 22l2.5-8h11L22 22" />
      <path d="M10.5 14v8M17.5 14v8M13 14v8" />
    </svg>
  );
}

function Wallbox({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <rect x="6" y="5" width="10" height="16" rx="1.5" />
      <path d="M9 9h4M9 13h4" />
      <path d="M16 10h2a2 2 0 0 1 2 2v7.5a1.5 1.5 0 0 0 3 0V12l-2-2.5" />
    </svg>
  );
}

function Light({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <path d="M14 4a7 7 0 0 0-4 12.7c.7.5 1 1.3 1 2.1V19h6v-.2c0-.8.3-1.6 1-2.1A7 7 0 0 0 14 4Z" />
      <path d="M11 22h6M12 24.5h4" />
    </svg>
  );
}

function Network({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <circle cx="14" cy="6" r="2.2" />
      <circle cx="6" cy="22" r="2.2" />
      <circle cx="22" cy="22" r="2.2" />
      <path d="M14 8.2V14M14 14l-6.5 6M14 14l6.5 6" />
    </svg>
  );
}

function Support({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} {...shared}>
      <path d="M6 15v-2a8 8 0 0 1 16 0v2" />
      <rect x="4" y="15" width="4.5" height="6" rx="1.5" />
      <rect x="19.5" y="15" width="4.5" height="6" rx="1.5" />
      <path d="M19.5 21v.5A3.5 3.5 0 0 1 16 25h-2" />
    </svg>
  );
}

const registry: Record<Service["icon"], (props: IconProps) => ReactElement> = {
  plug: Plug,
  renovate: Renovate,
  diagnose: Diagnose,
  smarthome: SmartHome,
  solar: Solar,
  wallbox: Wallbox,
  light: Light,
  network: Network,
  distribution: Distribution,
  support: Support,
};

export function ServiceIcon({ icon, className }: { icon: Service["icon"] } & IconProps) {
  const Cmp = registry[icon];
  return <Cmp className={className} />;
}
