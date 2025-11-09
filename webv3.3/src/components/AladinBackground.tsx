"use client";

interface AladinBackgroundProps {
  survey: string;
  target: string;
  fov: number;
  opacity?: number;
}

export default function AladinBackground({ survey, target, fov, opacity = 0.5 }: AladinBackgroundProps) {
  // Placeholder cosmic gradient inspired by Aladin sky surveys.
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(13, 240, 255, 0.2), transparent 60%), radial-gradient(circle at 80% 30%, rgba(0, 255, 65, 0.15), transparent 55%), radial-gradient(circle at 60% 70%, rgba(125, 211, 252, 0.2), transparent 65%)",
        opacity,
        mixBlendMode: "screen",
      }}
      aria-hidden
      data-survey={survey}
      data-target={target}
      data-fov={fov}
    />
  );
}
