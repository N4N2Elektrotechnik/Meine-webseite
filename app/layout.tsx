import type { Metadata } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { Analytics } from "@/components/consent/Analytics";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  weight: "variable",
  axes: ["opsz"],
  subsets: ["latin"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "N4N2 Elektrotechnik",
  description:
    "Ist die Spannung mal entzwei – N4N2 kommt vorbei! Elektrotechnik mit Präzision. (Weitere Inhalte folgen in späteren Phasen.)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
