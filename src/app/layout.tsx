import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import GoldDustCursor from "@/components/layout/GoldDustCursor";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "600", "700"]
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "MAB AI Strategies | Command Your Intelligence",
  description: "Hyper-interactive AI command center to scale intelligent automation and growth.",
  openGraph: {
    title: "MAB AI Strategies | Command Your Intelligence",
    description: "Command Center for automation, intelligence, and growth.",
    images: ["/logo.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <GoldDustCursor />
          <NavBar />
          <main className="flex-1 pt-20 pb-12 px-6 md:px-10 lg:px-16 max-w-7xl w-full mx-auto space-y-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
