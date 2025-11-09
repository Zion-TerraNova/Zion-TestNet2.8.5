"use client";

import Image from "next/image";

interface NasaBackgroundProps {
  src?: string;
}

export default function NasaBackground({ src }: NasaBackgroundProps) {
  if (!src) {
    return (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.35),_rgba(2,6,23,0.95))]" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image
        src={src}
        alt="NASA background"
        fill
        priority={false}
        className="object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
