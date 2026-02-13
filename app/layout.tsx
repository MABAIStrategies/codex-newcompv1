import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { StarryBackdrop } from "@/components/StarryBackdrop";
import { GoldCursorTrail } from "@/components/GoldCursorTrail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MAB AI Strategies | Interactive AI Experiences",
  description:
    "Hyper-interactive AI strategy hub showcasing Command Center, automation services, portfolio, testimonials, and consultation touchpoints.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} bg-midnight text-ivory`}>
      <body className="relative min-h-screen font-body antialiased">
        <StarryBackdrop />
        <GoldCursorTrail />
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 lg:pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
