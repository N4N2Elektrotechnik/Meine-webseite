import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CableTrail } from "@/components/cable/CableTrail";
import { About } from "@/components/sections/About";
import { company } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: `Über uns – ${company.name}`,
  description:
    "Lernen Sie N4N2 Elektrotechnik kennen: Meisterbetrieb für Elektroinstallationen in München und Umgebung.",
};

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="relative">
        <About variant="full" />
        <CableTrail />
      </main>
      <Footer />
    </>
  );
}
