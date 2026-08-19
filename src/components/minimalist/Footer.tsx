import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { Terminal, ArrowUp } from 'lucide-react';

interface FooterProps {
  onToggleMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onToggleMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-mono text-xs text-zinc-300">
            {portfolioData.name} - {portfolioData.role}
          </span>
          <span className="text-[11px] font-mono text-zinc-600 mt-0.5">
            Minimalist Portfolio & Shell System
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
