import Image from "next/image";

interface Props {
  overlay: string;
}

// Imagen principal de la home. Es el elemento LCP: se sirve con next/image (AVIF/WebP, tamaño según pantalla),
// con prioridad alta y precarga. Antes era un background-image en línea que el navegador descubría tarde y que,
// en fitnessfacil, pesaba 7,8 MB.
export default function HeroBackground({ overlay }: Props) {
  return (
    <>
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={55}
        className="object-cover object-center hero-bg-image"
        aria-hidden="true"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} aria-hidden="true" />
    </>
  );
}
