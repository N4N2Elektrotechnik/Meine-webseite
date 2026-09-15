import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Reviews } from "@/components/sections/Reviews";
import { CableCanvas } from "@/components/cable/CableCanvas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ contact?: string; review?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Contact status={sp.contact} />
        <Reviews status={sp.review} />
        <CableCanvas />
      </main>
      <Footer />
    </>
  );
}
