interface Props {
  overlay: string;
}

export default function HeroBackground({ overlay }: Props) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-image"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} aria-hidden="true" />
    </>
  );
}
