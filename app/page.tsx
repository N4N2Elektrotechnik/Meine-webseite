import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Reviews } from "@/components/sections/Reviews";
import { CableCanvas } from "@/components/cable/CableCanvas";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About variant="teaser" />
        <Services />
        <Contact variant="teaser" />
        <Reviews variant="teaser" />
        <CableCanvas />
      </main>
      <Footer />
    </>
  );
}
