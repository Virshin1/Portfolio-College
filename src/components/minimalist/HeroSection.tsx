import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { Terminal } from 'lucide-react';

interface HeroSectionProps {
  onToggleMode: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onToggleMode, onOpenResume }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Status */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-zinc-400">
            Available for Internships & Engineering Roles
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display">
            {portfolioData.name}
          </h1>
          <p className="text-xl sm:text-2xl font-mono text-zinc-400">
            {portfolioData.role}
          </p>
        </div>

        {/* Bio summary */}
        <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
          {portfolioData.tagline} Undergraduate at {portfolioData.education.institution} focused on distributed architectures, container orchestration, and full-stack software systems.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-8">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold tracking-wide transition-colors"
          >
            View Projects
          </a>

          <button
            onClick={onToggleMode}
            className="px-4 py-2.5 rounded border border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Interactive Terminal</span>
          </button>

          <button
            onClick={onOpenResume}
            className="px-4 py-2.5 rounded border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
          >
            Curriculum Vitae
          </button>

          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Quick specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-zinc-900">
          <div>
            <div className="text-xs font-mono text-zinc-500">Degree</div>
            <div className="text-xs font-mono text-zinc-200 mt-1">B.Tech CSE (2024–2028)</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-500">Institution</div>
            <div className="text-xs font-mono text-zinc-200 mt-1">ITM Skills University</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-500">Focus</div>
            <div className="text-xs font-mono text-zinc-200 mt-1">Cloud & DevOps / Systems</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-500">Location</div>
            <div className="text-xs font-mono text-zinc-200 mt-1">Navi Mumbai, India</div>
          </div>
        </div>
      </div>
    </section>
  );
};
