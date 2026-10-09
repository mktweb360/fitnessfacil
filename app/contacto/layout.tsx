import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes alguna pregunta o sugerencia? Contacta con el equipo de FitnessFácil.es.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
