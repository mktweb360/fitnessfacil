import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "FitnessFácil — Ejercicio en Casa, Equipamiento y Guías de Fitness",
    template: "%s | FitnessFácil.es",
  },
  description:
    "Análisis honestos de cintas de correr, bicicletas estáticas, mancuernas y suplementos. Guías de fitness para entrenar en casa sin ir al gimnasio.",
  metadataBase: new URL("https://www.fitnessfacil.es"),
  alternates: { canonical: "https://www.fitnessfacil.es" },
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
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mkt Web 360 SLU",
  legalName: "Mkt Web 360 SLU",
  url: "https://www.fitnessfacil.es",
  taxID: "B87679304",
  email: "info@mktweb360.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
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
