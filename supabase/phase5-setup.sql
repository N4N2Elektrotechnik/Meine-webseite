-- Phase 5: Kontaktanfragen + Kundenbewertungen
-- Einmalig im Supabase SQL Editor ausführen (Projekt → SQL Editor → New query).

-- ============================================================
-- 1. Kontaktanfragen
-- ============================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  email text not null check (char_length(trim(email)) > 0),
  phone text,
  message text not null check (
    char_length(trim(message)) > 0 and char_length(message) <= 4000
  ),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Jeder darf eine Anfrage einreichen (das Kontaktformular ist öffentlich).
create policy "contact_messages_insert_public"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- Nur angemeldete Nutzer (= Admin) dürfen Anfragen lesen/bearbeiten/löschen.
create policy "contact_messages_select_admin"
  on public.contact_messages for select
  to authenticated
  using (true);

create policy "contact_messages_update_admin"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "contact_messages_delete_admin"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- ============================================================
-- 2. Kundenbewertungen
-- ============================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (
    char_length(trim(name)) > 0 and char_length(name) <= 100
  ),
  email text not null check (char_length(trim(email)) > 0),
  rating smallint not null check (rating between 1 and 5),
  text text not null check (
    char_length(trim(text)) > 0 and char_length(text) <= 2000
  ),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Jeder darf eine Bewertung einreichen — aber NUR mit status='pending'.
-- Diese with-check-Klausel verhindert, dass sich jemand über die
-- öffentliche API selbst freigibt.
create policy "reviews_insert_public"
  on public.reviews for insert
  to anon, authenticated
  with check (status = 'pending');

-- Nur der Admin sieht/bearbeitet/löscht Bewertungen in der Rohtabelle
-- (inkl. E-Mail-Adresse — die bleibt hier bewusst nicht öffentlich lesbar).
create policy "reviews_select_admin"
  on public.reviews for select
  to authenticated
  using (true);

create policy "reviews_update_admin"
  on public.reviews for update
  to authenticated
  using (true)
  with check (true);

create policy "reviews_delete_admin"
  on public.reviews for delete
  to authenticated
  using (true);

-- Öffentliche, sichere Sicht: nur freigegebene Bewertungen, OHNE
-- E-Mail-Spalte. Darüber liest die Website später die Bewertungsliste,
-- nie über die reviews-Tabelle direkt.
create or replace view public.approved_reviews as
  select id, name, rating, text, created_at
  from public.reviews
  where status = 'approved';

grant select on public.approved_reviews to anon, authenticated;

-- ============================================================
-- 3. Nachtrag: Basis-GRANTs für contact_messages und reviews
-- ============================================================
-- RLS-Policies allein reichen nicht: Ohne eine SQL-GRANT-Berechtigung auf
-- der Tabelle weist Postgres eine Anfrage schon VOR der RLS-Prüfung mit
-- "permission denied for table ..." ab. Die folgenden GRANTs geben genau
-- den Rollen genau die Rechte, die die Policies oben ohnehin vorsehen:
-- anon darf weiterhin nur einfügen (contact_messages_insert_public /
-- reviews_insert_public greifen weiterhin als zusätzliche Einschränkung,
-- z. B. status = 'pending' bei reviews), authenticated (= eingeloggter
-- Admin) darf zusätzlich lesen/aktualisieren/löschen — ebenfalls weiterhin
-- begrenzt durch die bestehenden *_admin-Policies. RLS bleibt in beiden
-- Tabellen aktiviert; an den Policies selbst ändert sich nichts.
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;

grant insert on public.reviews to anon, authenticated;
grant select, update, delete on public.reviews to authenticated;
