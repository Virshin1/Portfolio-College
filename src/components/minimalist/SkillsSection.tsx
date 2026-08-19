import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          03 / Stack
        </h2>
        <h3 className="text-2xl font-bold font-display text-white">
          Technical Skills
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {portfolioData.skills.map((cat) => (
          <div
            key={cat.category}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-4"
          >
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 border-b border-zinc-900 pb-2">
              {cat.category}
            </h4>

            <div className="space-y-2">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-zinc-300">{item.name}</span>
                  <span className="text-zinc-500 text-[10px] uppercase">{item.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
