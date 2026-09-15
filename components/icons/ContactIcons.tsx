/** Handgezeichnete Icons für die Kontakt-CTAs — 24x24, stroke, currentColor. */
type IconProps = { className?: string };

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M5 4h3.2l1.3 4.4-2.1 1.7a13 13 0 0 0 6.5 6.5l1.7-2.1L19.6 16v3.2c0 1-.9 1.8-1.9 1.6A16 16 0 0 1 3.4 5.9C3.2 4.9 4 4 5 4Z" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M4 12a8 8 0 1 1 3.3 6.4L4 19.5l1.1-3.2A7.96 7.96 0 0 1 4 12Z" />
      <path d="M9 11.2c.3 1.8 1.9 3.4 3.7 3.7" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" />
      <path d="M4.5 7 12 12.5 19.5 7" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
