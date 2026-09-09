"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface OfferSlide {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  href: string;
}

interface Props {
  slides: OfferSlide[];
  intervalMs?: number;
}

export default function OffersSlider({ slides, intervalMs = 4000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-full min-h-[360px] md:min-h-[420px] rounded-2xl overflow-hidden shadow-md group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.href}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== active}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Capa intermedia oscura uniforme (alpha ~0.30) para dar profundidad y legibilidad del texto */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Overlay adicional en degradado (alpha <= 0.10) para reforzar legibilidad del texto inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {/* Badge oferta destacada */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
              {slide.badge}
            </span>
          </div>

          {/* Slogan + CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="max-w-[85%] md:max-w-[70%]">
              <p className="text-white text-lg md:text-xl font-extrabold leading-snug mb-1 [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
                {slide.title}
              </p>
              <p className="text-white/90 text-sm mb-3 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {slide.subtitle}
              </p>
              <div className="flex items-center gap-3">
                <span className="bg-white text-green-700 font-bold text-sm px-3 py-1 rounded-lg shadow-sm">
                  {slide.price}
                </span>
                <Link
                  href={slide.href}
                  className="text-white text-sm font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]"
                >
                  Ver oferta →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.href}
            type="button"
            aria-label={`Ver oferta ${i + 1}`}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === active ? "bg-white w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
