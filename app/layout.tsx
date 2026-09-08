// STAGED FIX — fitnessfacil.es — app/layout.tsx
// CWV improvements applied on top of schema-layout.tsx:
//   1. Added next/font (Geist, subsets: ["latin"]) — eliminates web-font FOUT,
//      self-hosts via Next.js CDN, emits preload hint automatically.
//   2. Added rel="preconnect" + dns-prefetch to AdSense domains — reduces
//      TCP latency when the user accepts cookies.
//   3. Added google-adsense-account meta tag — required for AdSense site verification.
//   4. Wired geistSans.variable onto <html> so --font-geist-sans is available
//      to globals.css (see fitnessfacil-cwv-globals.css).
// Deploy: cp fitnessfacil-cwv-layout.tsx ../fitnessfacil/app/layout.tsx
//         cp fitnessfacil-cwv-globals.css ../fitnessfacil/app/globals.css

import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

/* CWV: next/font self-hosts Geist, subsets to latin, applies display:swap and
   emits a <link rel="preload"> automatically — eliminates FOUT and the
   render-blocking Google Fonts network round-trip.                            */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FitnessFácil — Ejercicio en Casa, Equipamiento y Guías de Fitness",
    template: "%s | FitnessFácil.es",
  },
  description:
    "Análisis honestos de cintas de correr, bicicletas estáticas, mancuernas y suplementos. Guías de fitness para entrenar en casa sin ir al gimnasio.",
  metadataBase: new URL("https://www.fitnessfacil.es"),
  openGraph: {
    siteName: "FitnessFácil.es",
    locale: "es_ES",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "EGaCM1bqeseSmbkp4j5LngWJBTT8D6P_F4GVevCcFh4",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FitnessFácil.es",
  url: "https://www.fitnessfacil.es",
  description:
    "Guías de fitness y análisis de equipamiento para entrenar en casa. Cintas de correr, bicicletas estáticas, mancuernas y suplementos deportivos.",
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.fitnessfacil.es/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitnessFácil.es",
  legalName: "Mkt Web 360 SLU",
  url: "https://www.fitnessfacil.es",
  logo: { "@type": "ImageObject", url: "https://www.fitnessfacil.es/logo.png" },
  taxID: "B87679304",
  email: "info@mktweb360.com",
  description: "Portal especializado en equipamiento fitness y entrenamiento en casa. Comparativas y análisis de cintas de correr, bicicletas estáticas, pesas y suplementos.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: ["entrenamiento en casa", "equipamiento fitness", "cintas de correr", "bicicletas estáticas", "suplementos deportivos"],
  sameAs: ["https://www.instagram.com/fitnessfacil.es", "https://www.facebook.com/fitnessfacil.es"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@mktweb360.com",
    availableLanguage: "Spanish",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* CWV: Preconnect to AdSense — opens TCP early so the script loads
            faster the moment the user gives consent in the cookie banner.     */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />

        {/* Consent Mode v2: todo denegado por defecto hasta que el banner haga 'update'. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});`}
        </Script>
        {/* AdSense site verification — ad script loaded conditionally by CookieBanner */}
        <meta name="google-adsense-account" content="ca-pub-6063067965030118" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
