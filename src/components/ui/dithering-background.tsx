import React, { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

interface DitheringBackgroundProps {
  className?: string;
  colorFront?: string;
  colorBack?: string;
  shape?: "warp" | "wave" | "sphere" | "simplex" | "dots" | "ripple" | "swirl";
  type?: "4x4" | "8x8" | "2x2" | "random";
  speed?: number;
  opacity?: number;
}

export const DitheringBackground: React.FC<DitheringBackgroundProps> = ({
  className = "",
  colorFront = "#71717a", // Muted zinc/slate tone that is soft and easy on the eyes
  colorBack = "#00000000",
  shape = "warp",
  type = "4x4",
  speed = 0.2,
  opacity = 0.22,
}) => {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Dithering
          colorBack={colorBack}
          colorFront={colorFront}
          shape={shape}
          type={type}
          speed={speed}
          className="w-full h-full"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
};

export default DitheringBackground;
