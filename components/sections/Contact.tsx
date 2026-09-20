import Link from "next/link";
import { company, contactLinks, social } from "@/lib/placeholder-data";
import { CableNode } from "@/components/cable/CableNode";
import { TrailDot } from "@/components/cable/TrailDot";
import { LocationSection } from "@/components/location/LocationSection";
import { ChatIcon, InstagramIcon, MailIcon, PhoneIcon } from "@/components/icons/ContactIcons";
import { submitContactMessage } from "@/lib/actions/contact";

const fields = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", label: "E-Mail", type: "email", autoComplete: "email" },
  { id: "phone", label: "Telefon (optional)", type: "tel", autoComplete: "tel" },
] as const;

const ctaChannels = [
  { href: contactLinks.tel, label: "Anrufen", detail: company.phone, Icon: PhoneIcon },
  { href: contactLinks.whatsapp, label: "WhatsApp", detail: company.phone, Icon: ChatIcon },
  { href: contactLinks.mail, label: "E-Mail", detail: company.email, Icon: MailIcon },
  { href: contactLinks.instagram, label: "Instagram", detail: social.instagramHandle, Icon: InstagramIcon },
] as const;

/**
 * `variant="teaser"` (Startseite) läuft im Kabel-Scroll mit (CableNode
 * bleibt erhalten) und zeigt nur Kanäle + Kurztext + Link zu /kontakt,
 * ohne das Formular. `variant="full"` (/kontakt) zeigt zusätzlich die
 * Firmendaten und das vollständige, Supabase-gestützte Formular.
 */
export function Contact({
  status,
  variant = "teaser",
}: {
  status?: string;
  variant?: "teaser" | "full";
}) {
  const Heading = variant === "full" ? "h1" : "h2";

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-navy-strong px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="circuit-veil pointer-events-none absolute inset-0" />
      {/* Radialer Verlauf statt blur-[130px]: gleiche Optik, aber kein
          CSS-Filter (große Blur-Flächen sind auf schwachen GPUs teuer). */}
      <div className="pointer-events-none absolute right-[-22%] top-[-15%] h-[900px] w-[900px] bg-[radial-gradient(circle,rgb(251_180_0/0.10)_0%,rgb(251_180_0/0.04)_28%,transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
      <div
        className={
          variant === "full" ? "grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20" : undefined
        }
      >
        <div className={variant === "full" ? "relative" : undefined}>
          {variant === "full" ? (
            // Ab lg läuft das Kabel als Schiene in der Spaltenlücke
            // (gap-20 = 80 px → 40 px Versatz), sonst im linken Seitenrand.
            <TrailDot className="left-[-14px] top-1 -translate-x-1/2 lg:left-auto lg:right-[-40px] lg:translate-x-1/2" />
          ) : null}
          {variant === "teaser" ? (
            <CableNode side="left" label="Leitung 12" />
          ) : null}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Kontakt
          </p>
          <Heading className="mt-4 max-w-md font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Sprechen wir über Ihr Projekt
          </Heading>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
            Ob Neubau, Sanierung oder Reparatur — schildern Sie uns kurz Ihr
            Anliegen, wir melden uns zeitnah zurück.
          </p>

          <div className="relative mt-8">
            {variant === "full" ? (
              <TrailDot className="left-[-14px] top-6 -translate-x-1/2 lg:left-auto lg:right-[-40px] lg:translate-x-1/2" />
            ) : null}
          <div className="grid grid-cols-2 gap-3 sm:max-w-md">
            {ctaChannels.map(({ href, label, detail, Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Instagram" || label === "WhatsApp" ? "_blank" : undefined}
                rel={label === "Instagram" || label === "WhatsApp" ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-xl border border-paper/15 px-4 py-3 transition-colors hover:border-gold hover:bg-gold/5"
              >
                <Icon className="h-5 w-5 flex-none text-gold" />
                <span className="min-w-0">
                  <span className="block font-mono text-xs uppercase tracking-[0.1em] text-paper/85">
                    {label}
                  </span>
                  <span className="block truncate text-[0.7rem] text-paper/45">
                    {detail}
                  </span>
                </span>
              </a>
            ))}
          </div>
          </div>

          {variant === "full" ? (
            <dl className="mt-10 space-y-4 font-mono text-sm text-paper/80">
              <div className="flex gap-3">
                <dt className="w-32 flex-none text-paper/45">Ansprechpartner</dt>
                <dd>{company.owner}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 flex-none text-paper/45">Einsatzgebiet</dt>
                <dd>{company.serviceArea}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 flex-none text-paper/45">Adresse</dt>
                <dd>{company.address}</dd>
              </div>
            </dl>
          ) : (
            <Link
              href="/kontakt"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong"
            >
              Projekt anfragen
            </Link>
          )}
        </div>

        {variant === "full" ? (
          <div className="relative">
          {/* Kabel läuft am Absenden-Button vorbei (ab lg in der Spaltenlücke)
              weiter zum Standort (LocationSection = Kabelende). */}
          <TrailDot
            className="bottom-12 left-[-14px] -translate-x-1/2 sm:bottom-14 lg:left-[-40px]"
          />
          <form
            action={submitContactMessage}
            className="relative rounded-2xl border border-paper/15 bg-paper/[0.04] p-8 sm:p-10"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            />
            {status === "success" ? (
              <p className="mb-6 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
                Danke für Ihre Nachricht! Wir melden uns zeitnah zurück.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mb-6 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                Ihre Nachricht konnte nicht gesendet werden. Bitte prüfen Sie
                Ihre Angaben und versuchen Sie es erneut.
              </p>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={field.id === "phone" ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.id}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.id !== "phone"}
                    className="mt-2 w-full rounded-lg border border-paper/15 bg-navy-soft/40 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-paper/15 bg-navy-soft/40 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-paper/70">
              <input
                type="checkbox"
                name="privacyConsent"
                required
                className="mt-1 h-4 w-4 flex-none rounded border-paper/30 bg-navy-soft/40 text-gold focus:ring-1 focus:ring-gold"
              />
              <span>
                Ich habe die{" "}
                <Link
                  href="/datenschutz"
                  className="underline decoration-paper/40 underline-offset-2 hover:text-gold"
                >
                  Datenschutzerklärung
                </Link>{" "}
                gelesen und bin mit der Verarbeitung meiner Daten zur
                Bearbeitung meiner Anfrage einverstanden.
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong sm:w-auto"
            >
              Nachricht senden
            </button>
          </form>
          </div>
        ) : null}
      </div>
      {variant === "full" ? <LocationSection /> : null}
      </div>
    </section>
  );
}
