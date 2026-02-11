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
  title: {
    default: "Ministerio Internacional Vida Nueva | Santuario Digital",
    template: "%s | MIVN"
  },
  description: "Plataforma de estudio bíblico profundo y crecimiento espiritual del Ministerio Internacional Vida Nueva (MIVN). Transformando vidas a través del amor de Cristo.",
  keywords: ["iglesia", "cristiana", "vida nueva", "mivn", "estudio bíblico", "crecimiento espiritual", "Lawrenceville", "Georgia"],
  authors: [{ name: "Edward Trinidad" }],
  creator: "Edward Trinidad",
  publisher: "Ministerio Internacional Vida Nueva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mivn.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ministerio Internacional Vida Nueva | Santuario Digital",
    description: "Conéctate, crece y participa en nuestra comunidad cristiana. Experimenta la gracia de Dios cada día.",
    url: "https://mivn.online",
    siteName: "MIVN",
    locale: "es_US",
    type: "website",
    images: [
      {
        url: "/logo_mivn.png",
        width: 800,
        height: 600,
        alt: "Logo MIVN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ministerio Internacional Vida Nueva",
    description: "Transformando vidas a través del amor de Cristo.",
    images: ["/logo_mivn.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
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
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { GoogleAnalytics } from '@next/third-parties/google'

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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
        <CookieProvider>
          <OrganizationSchema />
          <TopBanner />
          {children}
          <CookieBanner />
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              className: "border border-white/10 dark:bg-[#0a0f1d]/80 backdrop-blur-xl shadow-2xl rounded-2xl",
              style: {
                fontFamily: "var(--font-lexend)",
              },
            }}
          />
        </CookieProvider>
      </body>
    </html>
  );
}
