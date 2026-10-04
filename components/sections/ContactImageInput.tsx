"use client";

import { useEffect, useRef, useState } from "react";
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_BYTES,
  MAX_IMAGES,
  MAX_TOTAL_IMAGE_BYTES,
  formatMegabytes,
} from "@/lib/contact-images";

type Attachment = { id: string; file: File; previewUrl: string };

// Handyfotos (oft 3–8 MB) werden vor dem Senden auf diese Kantenlänge
// verkleinert, damit mehrere Bilder unter die Gesamtgrenze passen.
const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.82;
const KEEP_ORIGINAL_BELOW_BYTES = 1024 * 1024;

function extensionOf(name: string) {
  return name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
}

// Windows meldet HEIC oft ohne MIME-Typ — dann entscheidet die Endung.
// Der Server prüft zusätzlich den tatsächlichen Dateiinhalt.
function isAllowedImage(file: File) {
  return file.type
    ? ALLOWED_IMAGE_MIME_TYPES.includes(file.type)
    : ALLOWED_IMAGE_EXTENSIONS.includes(extensionOf(file.name));
}

/**
 * Verkleinert ein Bild per Canvas zu JPEG. Kann der Browser das Format
 * nicht dekodieren (z. B. HEIC außerhalb von Safari), bleibt die
 * Originaldatei erhalten.
 */
async function shrinkImage(file: File): Promise<File> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const isHeic = !["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (scale === 1 && !isHeic && file.size <= KEEP_ORIGINAL_BELOW_BYTES) {
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) return file;
    // Weiß hinterlegen: transparente PNG-Bereiche würden in JPEG schwarz.
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || (!isHeic && blob.size >= file.size)) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "bild";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

/**
 * Optionale Bildanhänge fürs Kontaktformular. Das eigentliche
 * `<input name="images">` wird bei jeder Änderung per DataTransfer mit der
 * aktuellen (verkleinerten) Auswahl befüllt — so schickt die normale
 * Server-Action genau die Bilder mit, die in der Vorschau zu sehen sind.
 */
export function ContactImageInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref als Quelle der Wahrheit (auch während asynchroner Verarbeitung),
  // State nur fürs Rendern.
  const attachmentsRef = useRef<Attachment[]>([]);
  const nextIdRef = useRef(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brokenPreviews, setBrokenPreviews] = useState<Set<string>>(new Set());

  function commit(next: Attachment[]) {
    attachmentsRef.current = next;
    setAttachments(next);
    const input = inputRef.current;
    if (!input) return;
    try {
      const transfer = new DataTransfer();
      next.forEach((attachment) => transfer.items.add(attachment.file));
      input.files = transfer.files;
    } catch {
      // Sehr alte Browser ohne DataTransfer-Konstruktor: Auswahl bleibt,
      // wie der Browser sie gesetzt hat; der Server prüft trotzdem.
    }
  }

  // React setzt das Formular nach erfolgreicher Server-Action zurück —
  // dann auch Vorschau und Fehlermeldungen leeren.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    function handleReset() {
      attachmentsRef.current.forEach((a) => URL.revokeObjectURL(a.previewUrl));
      attachmentsRef.current = [];
      setAttachments([]);
      setErrors([]);
    }
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, []);

  useEffect(
    () => () => attachmentsRef.current.forEach((a) => URL.revokeObjectURL(a.previewUrl)),
    [],
  );

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    // Sofort die bisherige Auswahl zurückschreiben: Die frisch gewählten,
    // noch unverkleinerten Originale sollen nie mitgesendet werden.
    commit(attachmentsRef.current);
    if (selected.length === 0) return;

    setIsProcessing(true);
    const nextErrors: string[] = [];
    const next = [...attachmentsRef.current];
    let total = next.reduce((sum, a) => sum + a.file.size, 0);

    for (const original of selected) {
      if (next.length >= MAX_IMAGES) {
        nextErrors.push(
          `Es sind höchstens ${MAX_IMAGES} Bilder möglich – weitere Bilder wurden nicht übernommen.`,
        );
        break;
      }
      if (!isAllowedImage(original)) {
        nextErrors.push(
          `„${original.name}“ ist kein erlaubtes Bildformat. Erlaubt sind JPG, PNG, WEBP und HEIC.`,
        );
        continue;
      }

      const file = await shrinkImage(original);
      if (file.size > MAX_IMAGE_BYTES) {
        nextErrors.push(
          `„${original.name}“ ist zu groß (${formatMegabytes(file.size)}). Erlaubt sind max. ${formatMegabytes(MAX_IMAGE_BYTES)} pro Bild.`,
        );
        continue;
      }
      if (total + file.size > MAX_TOTAL_IMAGE_BYTES) {
        nextErrors.push(
          `„${original.name}“ passt nicht mehr dazu: Alle Bilder zusammen dürfen max. ${formatMegabytes(MAX_TOTAL_IMAGE_BYTES)} groß sein. Entfernen Sie ggf. ein anderes Bild.`,
        );
        continue;
      }

      total += file.size;
      next.push({
        id: String(nextIdRef.current++),
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    commit(next);
    setErrors(nextErrors);
    setIsProcessing(false);
  }

  function removeAttachment(id: string) {
    const removed = attachmentsRef.current.find((a) => a.id === id);
    if (removed) URL.revokeObjectURL(removed.previewUrl);
    commit(attachmentsRef.current.filter((a) => a.id !== id));
    setErrors([]);
  }

  const isFull = attachments.length >= MAX_IMAGES;

  return (
    <div className="sm:col-span-2">
      <span
        id="images-label"
        className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60"
      >
        Bilder (optional)
      </span>
      <input
        ref={inputRef}
        id="images"
        name="images"
        type="file"
        multiple
        accept={[
          ...ALLOWED_IMAGE_MIME_TYPES,
          ...ALLOWED_IMAGE_EXTENSIONS.map((ext) => `.${ext}`),
        ].join(",")}
        onChange={handleChange}
        aria-labelledby="images-label"
        aria-describedby="images-hint"
        className="peer sr-only"
      />
      <label
        htmlFor="images"
        aria-disabled={isFull}
        className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors peer-focus-visible:border-gold peer-focus-visible:ring-1 peer-focus-visible:ring-gold ${
          isFull
            ? "pointer-events-none border-paper/10 text-paper/30"
            : "cursor-pointer border-paper/25 bg-navy-soft/40 text-paper/80 hover:border-gold hover:text-gold"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 flex-none">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="m21 16-5-5-8 8" />
        </svg>
        {isFull ? `${MAX_IMAGES} von ${MAX_IMAGES} Bildern ausgewählt` : "Bilder auswählen"}
      </label>
      <p id="images-hint" className="mt-2 text-xs leading-relaxed text-paper/45">
        Bis zu {MAX_IMAGES} Bilder (JPG, PNG, WEBP, HEIC), je max.{" "}
        {formatMegabytes(MAX_IMAGE_BYTES)}, zusammen max.{" "}
        {formatMegabytes(MAX_TOTAL_IMAGE_BYTES)}. Fotos werden vor dem Senden
        automatisch verkleinert.
      </p>

      <p aria-live="polite" className="text-xs text-gold empty:hidden">
        {isProcessing ? "Bilder werden vorbereitet …" : ""}
      </p>

      {errors.length > 0 ? (
        <ul
          role="alert"
          className="mt-3 space-y-1 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}

      {attachments.length > 0 ? (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-paper/15 bg-navy-soft/40"
            >
              {brokenPreviews.has(attachment.id) ? (
                // Browser kann das Format nicht anzeigen (z. B. HEIC in
                // Chrome) — Datei wird trotzdem mitgesendet.
                <span className="flex h-full w-full items-center justify-center break-all p-2 text-center text-[0.65rem] leading-tight text-paper/60">
                  {attachment.file.name}
                </span>
              ) : (
                // Lokale blob:-Vorschau — next/image ist dafür nicht gedacht.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={attachment.previewUrl}
                  alt={`Vorschau: ${attachment.file.name}`}
                  onError={() =>
                    setBrokenPreviews((current) => new Set(current).add(attachment.id))
                  }
                  className="h-full w-full object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => removeAttachment(attachment.id)}
                aria-label={`Bild entfernen: ${attachment.file.name}`}
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-navy-strong/85 text-paper transition-colors hover:bg-gold hover:text-navy-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
