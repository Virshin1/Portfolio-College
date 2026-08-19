import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Award, Trophy, Star } from 'lucide-react';

export const Accomplishments: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Trophy className="w-4 h-4 text-zinc-300" />;
      case 1:
        return <Award className="w-4 h-4 text-zinc-300" />;
      default:
        return <Star className="w-4 h-4 text-zinc-300" />;
    }
  };

  return (
    <section id="accomplishments" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60">
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Trophy className="w-3.5 h-3.5 text-zinc-400" />
          <span>05 / Recognition & Honors</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Achievements & Benchmarks
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.accomplishments.map((acc, index) => (
          <div
            key={acc.title}
            className="glass-panel p-6 rounded-xl border border-zinc-800/80 space-y-3.5 flex flex-col justify-between hover:border-zinc-500 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-600 transition-colors">
                  {getIcon(index)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 bg-zinc-900/60">
                  {acc.event}
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-mono leading-snug">
                {acc.title}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {acc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-900/80 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Verified Distinction</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
