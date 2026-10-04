/**
 * Gemeinsame Grenzen für Bildanhänge im Kontaktformular — genutzt vom
 * Browser (components/sections/ContactImageInput.tsx) und vom Server
 * (lib/actions/contact.ts), damit beide dieselben Regeln prüfen.
 *
 * Gesamtgrenze bewusst deutlich unter dem Resend-Limit (40 MB pro Mail):
 * Netlify Functions nehmen nur ca. 6 MB pro Anfrage an (Binärdaten
 * base64-kodiert), daher max. 4 MB Bilder pro Anfrage. Fotos werden im
 * Browser vorher verkleinert, sodass 5 Handyfotos problemlos hineinpassen.
 */
export const MAX_IMAGES = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_IMAGE_BYTES = 4 * 1024 * 1024;

export const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];
export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export function formatMegabytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toLocaleString("de-DE", { maximumFractionDigits: 1 })} MB`;
}
