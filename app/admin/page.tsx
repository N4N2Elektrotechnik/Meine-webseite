import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import {
  approveReview,
  rejectReview,
  deleteReview,
  deleteMessage,
  logout,
} from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin – N4N2 Elektrotechnik",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const statusLabels: Record<string, string> = {
  pending: "Ausstehend",
  approved: "Freigegeben",
  rejected: "Abgelehnt",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: messages, error: messagesError }, { data: reviews, error: reviewsError }] =
    await Promise.all([
      supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

  return (
    <main className="min-h-svh bg-paper px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
              N4N2 · Admin
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
              Übersicht
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold hover:text-gold-strong"
            >
              Abmelden
            </button>
          </form>
        </div>

        {/* Bewertungen */}
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-navy sm:text-2xl">
            Bewertungen ({reviews?.length ?? 0})
          </h2>

          {reviewsError ? (
            <p className="mt-4 text-sm text-red-600">
              Bewertungen konnten nicht geladen werden: {reviewsError.message}
            </p>
          ) : null}

          <div className="mt-4 space-y-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                        <span aria-hidden="true" className="text-gold">
                          {"★".repeat(review.rating)}
                          <span className="text-line">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </span>
                        <span>· {review.name}</span>
                        <span>· {review.email}</span>
                        <span className="rounded-full border border-line px-2 py-0.5">
                          {statusLabels[review.status] ?? review.status}
                        </span>
                      </div>
                      <p className="mt-3 text-navy">{review.text}</p>
                      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted/70">
                        {formatDate(review.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-none flex-wrap gap-2">
                      {review.status !== "approved" ? (
                        <form action={approveReview.bind(null, review.id)}>
                          <button
                            type="submit"
                            className="rounded-full bg-gold px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-navy-strong transition-colors hover:bg-gold-strong"
                          >
                            Freigeben
                          </button>
                        </form>
                      ) : null}
                      {review.status !== "rejected" ? (
                        <form action={rejectReview.bind(null, review.id)}>
                          <button
                            type="submit"
                            className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-navy transition-colors hover:border-navy"
                          >
                            Ablehnen
                          </button>
                        </form>
                      ) : null}
                      <form action={deleteReview.bind(null, review.id)}>
                        <button
                          type="submit"
                          className="rounded-full border border-red-300 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-red-600 transition-colors hover:bg-red-50"
                        >
                          Löschen
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Noch keine Bewertungen.</p>
            )}
          </div>
        </section>

        {/* Kontaktanfragen */}
        <section className="mt-14">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-navy sm:text-2xl">
            Kontaktanfragen ({messages?.length ?? 0})
          </h2>

          {messagesError ? (
            <p className="mt-4 text-sm text-red-600">
              Kontaktanfragen konnten nicht geladen werden: {messagesError.message}
            </p>
          ) : null}

          <div className="mt-4 space-y-4">
            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                        {message.name} · {message.email}
                        {message.phone ? ` · ${message.phone}` : ""}
                      </p>
                      <p className="mt-3 text-navy">{message.message}</p>
                      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted/70">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                    <form
                      action={deleteMessage.bind(null, message.id)}
                      className="flex-none"
                    >
                      <button
                        type="submit"
                        className="rounded-full border border-red-300 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-red-600 transition-colors hover:bg-red-50"
                      >
                        Löschen
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Noch keine Kontaktanfragen.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
