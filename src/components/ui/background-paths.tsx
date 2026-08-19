import React, { useEffect, useRef } from "react";

interface BackgroundPathsProps {
  className?: string;
  opacity?: number;
}

export const BackgroundPathsContainer: React.FC<BackgroundPathsProps> = ({
  className = "",
  opacity = 0.45,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Pause animation when not in viewport to save 100% CPU/GPU
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 16 curated smooth flowing bezier wave paths
    const linesCount = 14;
    const paths = Array.from({ length: linesCount }, (_, i) => ({
      speed: 0.0006 + (i % 5) * 0.0002,
      offset: (i * Math.PI * 2) / linesCount,
      amplitude: 50 + (i % 4) * 25,
      frequency: 0.0018 + (i % 3) * 0.0006,
      lineWidth: 0.75 + (i % 3) * 0.4,
      alpha: 0.06 + (i / linesCount) * 0.12,
    }));

    let time = 0;

    const render = () => {
      if (isVisible && ctx && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        time += 1;

        // Draw flowing diagonal bezier waves
        for (let i = 0; i < linesCount; i++) {
          const line = paths[i];
          const currentOffset = time * line.speed + line.offset;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha * opacity})`;
          ctx.lineWidth = line.lineWidth;

          const startX = -100;
          const startY = height * 0.2 + Math.sin(currentOffset) * line.amplitude;
          
          const cp1x = width * 0.35 + Math.cos(currentOffset * 0.8) * 60;
          const cp1y = height * 0.7 + Math.sin(currentOffset * 1.2) * line.amplitude * 1.5;
          
          const cp2x = width * 0.65 + Math.sin(currentOffset * 0.9) * 60;
          const cp2y = height * 0.1 + Math.cos(currentOffset * 1.1) * line.amplitude * 1.5;
          
          const endX = width + 100;
          const endY = height * 0.85 + Math.sin(currentOffset + 2) * line.amplitude;

          ctx.moveTo(startX, startY);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          ctx.stroke();

          // Second mirrored subtle wave
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha * 0.7 * opacity})`;
          
          const mStartX = -100;
          const mStartY = height * 0.8 + Math.cos(currentOffset) * line.amplitude;
          
          const mCp1x = width * 0.3 + Math.sin(currentOffset) * 50;
          const mCp1y = height * 0.2 + Math.cos(currentOffset * 0.9) * line.amplitude;
          
          const mCp2x = width * 0.7 + Math.cos(currentOffset) * 50;
          const mCp2y = height * 0.9 + Math.sin(currentOffset * 0.8) * line.amplitude;
          
          const mEndX = width + 100;
          const mEndY = height * 0.3 + Math.cos(currentOffset + 1.5) * line.amplitude;

          ctx.moveTo(mStartX, mStartY);
          ctx.bezierCurveTo(mCp1x, mCp1y, mCp2x, mCp2y, mEndX, mEndY);
          ctx.stroke();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [opacity]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
};
