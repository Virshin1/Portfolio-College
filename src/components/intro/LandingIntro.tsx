import React from 'react';
import { ShaderAnimation } from '../ui/shader-animation';
import { portfolioData } from '../../data/portfolioData';
import { ArrowDown, Terminal, Layout, ArrowRight } from 'lucide-react';

interface LandingIntroProps {
  onEnterMinimalist: () => void;
  onEnterTerminal: () => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({
  onEnterMinimalist,
  onEnterTerminal,
}) => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      {/* Fullscreen Three.js Shader Animation */}
      <div className="absolute inset-0 w-full h-full">
        <ShaderAnimation className="w-full h-full" speed={0.04} />
      </div>

      {/* Subtle dark vignette overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

      {/* Center Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono tracking-widest uppercase">
          <span>Portfolio / 2026</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-display tracking-tighter text-white uppercase">
          {portfolioData.name}
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-mono text-zinc-400 max-w-2xl font-light">
          {portfolioData.role}
        </p>

        <p className="text-xs sm:text-sm text-zinc-500 max-w-lg font-mono">
          B.Tech in Computer Science and Engineering at {portfolioData.education.institution}
        </p>

        {/* Enter Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 w-full sm:w-auto">
          <button
            onClick={onEnterMinimalist}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] cursor-pointer"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Enter Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onEnterTerminal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:border-white/30"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Terminal Mode</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={onEnterMinimalist}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
};
