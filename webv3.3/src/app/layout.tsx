import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Share_Tech_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import { ThemeLangProvider } from "@/context/ThemeLangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const shareMono = Share_Tech_Mono({
  variable: "--font-sharemono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ZION TerraNova — TestNet 2.8.5",
  description: "Matrix-inspired documentation hub for the ZION consciousness-based blockchain.",
  metadataBase: new URL("https://zion-terranova.org"),
  openGraph: {
    title: "ZION TerraNova — TestNet 2.8.5",
    description: "Explore the consciousness-driven blockchain ecosystem, docs, and whitepaper.",
    url: "https://zion-terranova.org",
    siteName: "ZION TerraNova",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <Script id="bootstrap-theme-lang" strategy="beforeInteractive">
          {`(() => { try { var t=localStorage.getItem('zion-theme'); var l=localStorage.getItem('zion-lang'); var d=document.documentElement; if(t){ d.dataset.theme=t; } else { d.dataset.theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'; } if(l){ d.lang=l; } } catch(e){} })();`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${shareMono.variable} antialiased`}
      >
        <a
          href="#start"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md bg-black/70 px-4 py-2 text-sm text-white shadow-glow-green"
        >
          Přeskočit na obsah
        </a>
        <ThemeLangProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <ConditionalFooter />
        </ThemeLangProvider>
      </body>
    </html>
  );
}
