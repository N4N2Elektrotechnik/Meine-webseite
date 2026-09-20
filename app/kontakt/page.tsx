import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CableTrail } from "@/components/cable/CableTrail";
import { Contact } from "@/components/sections/Contact";
import { company } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Kontakt – ${company.name}`,
  description:
    "Nehmen Sie Kontakt zu N4N2 Elektrotechnik auf — per Telefon, WhatsApp, E-Mail oder direkt über das Kontaktformular.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ contact?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Header />
      <main className="relative">
        <Contact variant="full" status={sp.contact} />
        <CableTrail tone="dark" />
      </main>
      <Footer />
    </>
  );
}
