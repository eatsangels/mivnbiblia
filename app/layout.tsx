import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville, Playfair_Display, Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ministerio Internacional Vida Nueva | Santuario Digital",
  description: "Plataforma de estudio bíblico profundo y crecimiento espiritual del Ministerio Internacional Vida Nueva (MIVN).",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

import { TopBanner } from "@/components/institute/TopBanner";
import { CookieProvider } from "@/contexts/CookieContext";
import { CookieBanner } from "@/components/cookies/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${playfair.variable} ${lexend.variable} antialiased`}
      >
        <CookieProvider>
          <TopBanner />
          {children}
          <CookieBanner />
          <Toaster richColors position="top-right" />
        </CookieProvider>
      </body>
    </html>
  );
}
