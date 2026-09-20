import { Fragment } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { submitReview } from "@/lib/actions/reviews";
import { TrailDot } from "@/components/cable/TrailDot";

const ratingFields = [5, 4, 3, 2, 1] as const;
const TEASER_LIMIT = 3;

/**
 * `variant="teaser"` (Startseite) zeigt nur die neuesten freigegebenen
 * Bewertungen ohne Formular, mit Link zu /bewertungen. `variant="full"`
 * (/bewertungen) zeigt alle freigegebenen Bewertungen plus das
 * Supabase-gestützte Bewertungsformular.
 */
export async function Reviews({
  status,
  variant = "teaser",
}: {
  status?: string;
  variant?: "teaser" | "full";
}) {
  const supabase = await createClient();
  let query = supabase
    .from("approved_reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (variant === "teaser") {
    query = query.limit(TEASER_LIMIT);
  }
  const { data: approvedReviews } = await query;

  const reviews = approvedReviews ?? [];
  const Heading = variant === "full" ? "h1" : "h2";
  const isFull = variant === "full";

  return (
    <section id="bewertungen" className="relative bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className={isFull ? "relative max-w-2xl" : "max-w-2xl"}>
          {isFull ? (
            <TrailDot className="left-[-14px] top-1 -translate-x-1/2" />
          ) : null}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
            Bewertungen
          </p>
          <Heading className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
            Ihre Erfahrung zählt
          </Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Freigegebene Bewertungen erscheinen hier — echte Rückmeldungen
            von Kundinnen und Kunden, vor der Veröffentlichung geprüft.
          </p>
        </div>

        <div
          className={
            isFull ? "mt-16 max-w-3xl space-y-16" : "mt-16"
          }
        >
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-navy/50">
              Veröffentlichte Bewertungen
            </p>

            {reviews.length === 0 ? (
              <div className="relative flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-8 py-16 text-center">
                {isFull ? (
                  <TrailDot className="left-[-14px] top-10 -translate-x-1/2" />
                ) : null}
                <span aria-hidden="true" className="text-4xl text-line">
                  ★
                </span>
                <p className="mt-4 font-medium text-navy">
                  Noch keine freigegebenen Bewertungen.
                </p>
                <p className="mt-2 max-w-xs text-sm text-muted">
                  Sobald Bewertungen geprüft und freigegeben sind, erscheinen
                  sie an dieser Stelle.
                </p>
              </div>
            ) : (
              <ul
                className={
                  variant === "teaser"
                    ? "grid gap-5 sm:grid-cols-3"
                    : "space-y-5"
                }
              >
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className={`rounded-2xl border border-line bg-surface p-6${
                      isFull ? " relative" : ""
                    }`}
                  >
                    {isFull ? (
                      <TrailDot className="left-[-14px] top-9 -translate-x-1/2" />
                    ) : null}
                    <div aria-hidden="true" className="text-lg tracking-wide text-gold">
                      {"★".repeat(review.rating)}
                      <span className="text-line">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="mt-3 text-navy">&bdquo;{review.text}&ldquo;</p>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      — {review.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {variant === "teaser" ? (
              <Link
                href="/bewertungen"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-strong"
              >
                Alle Bewertungen ansehen
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>

          {variant === "full" ? (
            <div className="relative">
              <TrailDot
                terminal
                className="left-[-14px] top-1 -translate-x-1/2"
              />
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-navy/50">
                Bewertung abgeben
              </p>
              <form
                action={submitReview}
                className="rounded-2xl border border-line bg-surface p-8 sm:p-10"
              >
                {status === "success" ? (
                  <p className="mb-6 rounded-lg border border-gold-strong/40 bg-gold-soft px-4 py-3 text-sm text-navy">
                    Danke! Ihre Bewertung wurde übermittelt und wird nun geprüft.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Ihre Bewertung konnte nicht übermittelt werden. Bitte prüfen
                    Sie Ihre Angaben und versuchen Sie es erneut.
                  </p>
                ) : null}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
                    >
                      Name / Anzeigename
                    </label>
                    <input
                      id="review-name"
                      name="name"
                      type="text"
                      required
                      className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-navy placeholder:text-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="review-email"
                      className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
                    >
                      E-Mail-Adresse
                    </label>
                    <input
                      id="review-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-navy placeholder:text-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    <p className="mt-1.5 text-xs text-muted">
                      Wird niemals veröffentlicht — nur für Rückfragen zu Ihrer
                      Bewertung.
                    </p>
                  </div>

                  <fieldset>
                    <legend className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      Sternebewertung
                    </legend>
                    <div className="star-input mt-3" role="radiogroup" aria-label="Sternebewertung, 1 bis 5">
                      {ratingFields.map((n) => (
                        <Fragment key={n}>
                          <input type="radio" id={`review-star-${n}`} name="rating" value={n} required />
                          <label htmlFor={`review-star-${n}`} aria-label={`${n} von 5 Sternen`}>
                            ★
                          </label>
                        </Fragment>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="review-text"
                      className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
                    >
                      Ihre Bewertung
                    </label>
                    <textarea
                      id="review-text"
                      name="text"
                      rows={4}
                      required
                      className="mt-2 w-full resize-none rounded-lg border border-line bg-paper px-4 py-3 text-navy placeholder:text-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-7 rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong"
                >
                  Bewertung absenden
                </button>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
                  Ihre Bewertung wird vor der Veröffentlichung geprüft und
                  erscheint erst nach Freigabe öffentlich. Ihre E-Mail-Adresse
                  bleibt dabei immer privat. Details dazu in unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="underline decoration-line underline-offset-2 hover:text-gold-strong"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
