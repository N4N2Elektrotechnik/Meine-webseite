import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CableTrail } from "@/components/cable/CableTrail";
import { Reviews } from "@/components/sections/Reviews";
import { company } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Bewertungen – ${company.name}`,
  description:
    "Echte Kundenbewertungen zu N4N2 Elektrotechnik — und die Möglichkeit, selbst eine Bewertung abzugeben.",
};

export default async function BewertungenPage({
  searchParams,
}: {
  searchParams: Promise<{ review?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Header />
      <main className="relative">
        <Reviews variant="full" status={sp.review} />
        <CableTrail />
      </main>
      <Footer />
    </>
  );
}
