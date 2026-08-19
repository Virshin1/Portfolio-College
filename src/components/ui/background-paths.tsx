import React, { useMemo } from "react";

interface FloatingPathsProps {
  position?: number;
  className?: string;
}

export const FloatingPaths: React.FC<FloatingPathsProps> = ({ position = 1, className = "" }) => {
  // Generate 16 beautifully curved bezier paths with smooth varied durations
  const paths = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 12 * position} -${189 + i * 14}C-${
        380 - i * 12 * position
      } -${189 + i * 14} -${312 - i * 12 * position} ${216 - i * 14} ${
        152 - i * 12 * position
      } ${343 - i * 14}C${616 - i * 12 * position} ${470 - i * 14} ${
        684 - i * 12 * position
      } ${875 - i * 14} ${684 - i * 12 * position} ${875 - i * 14}`,
      width: 0.6 + i * 0.05,
      duration: 18 + (i % 6) * 3,
      delay: (i * 0.75) % 8,
      opacity: 0.05 + i * 0.015,
    }));
  }, [position]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <svg
        className="w-full h-full text-white floating-path-svg"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            className="flowing-path-element"
            style={{
              animationDuration: `${path.duration}s`,
              animationDelay: `-${path.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export const BackgroundPathsContainer: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
};
