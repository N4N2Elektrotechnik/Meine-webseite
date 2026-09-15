import type { ReactNode } from "react";

/** Gemeinsames Grundgerüst für Impressum und Datenschutzerklärung. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-paper px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        ) : null}
        <div className="mt-14 space-y-14">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-navy sm:text-2xl">
        {title}
      </h2>
      <div className="prose-legal mt-4 space-y-4 text-base leading-relaxed text-muted [&_a]:text-navy [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-2 [&_a:hover]:text-gold-strong [&_strong]:text-navy [&_strong]:font-medium">
        {children}
      </div>
    </section>
  );
}

export function LegalFields({
  rows,
}: {
  rows: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="space-y-2 font-mono text-sm">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
          <dt className="text-navy/50 sm:w-48 sm:flex-none">{row.label}</dt>
          <dd className="text-navy">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
