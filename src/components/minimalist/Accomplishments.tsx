import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export const Accomplishments: React.FC = () => {
  return (
    <section id="accomplishments" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          05 / Honors
        </h2>
        <h3 className="text-2xl font-bold font-display text-white">
          Achievements & Recognition
        </h3>
      </div>

      <div className="space-y-4">
        {portfolioData.accomplishments.map((acc) => (
          <div
            key={acc.title}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h4 className="text-sm font-semibold text-white font-mono">
                {acc.title}
              </h4>
              <span className="text-xs font-mono text-zinc-500">{acc.event}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              {acc.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
