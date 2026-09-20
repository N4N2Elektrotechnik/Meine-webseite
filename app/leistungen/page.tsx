import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CableTrail } from "@/components/cable/CableTrail";
import { Services } from "@/components/sections/Services";
import { company } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Leistungen – ${company.name}`,
  description:
    "Elektroinstallationen, Altbausanierung, Smart Home, Wallbox, Photovoltaik und mehr — alle Leistungen von N4N2 Elektrotechnik im Überblick.",
};

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main className="relative">
        <Services variant="full" />
        <CableTrail />
      </main>
      <Footer />
    </>
  );
}
