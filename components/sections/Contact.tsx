import Link from "next/link";
import { company, contactLinks, social } from "@/lib/placeholder-data";
import { CableNode } from "@/components/cable/CableNode";
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

export function Contact({ status }: { status?: string }) {
  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-navy-strong px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="circuit-veil pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute right-[-8%] top-[10%] h-[420px] w-[420px] rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <CableNode side="left" label="Leitung 12" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Kontakt
          </p>
          <h2 className="mt-4 max-w-md font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Sprechen wir über Ihr Projekt
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
            Ob Neubau, Sanierung oder Störung — schildern Sie uns kurz Ihr
            Anliegen, wir melden uns zeitnah zurück.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
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
            <div className="flex gap-3">
              <dt className="w-32 flex-none text-paper/45">Erreichbarkeit</dt>
              <dd>{company.hours}</dd>
            </div>
          </dl>
        </div>

        <form
          action={submitContactMessage}
          className="relative rounded-2xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm sm:p-10"
        >
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
    </section>
  );
}
