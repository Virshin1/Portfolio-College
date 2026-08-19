import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Terminal, Code, Cpu, Cloud, Wrench } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getLevelPercent = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'w-[90%]';
      case 'proficient':
        return 'w-[75%]';
      case 'intermediate':
        return 'w-[60%]';
      default:
        return 'w-[50%]';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'languages':
        return <Code className="w-4 h-4 text-zinc-400" />;
      case 'frameworks':
        return <Cpu className="w-4 h-4 text-zinc-400" />;
      case 'cloud & devops':
        return <Cloud className="w-4 h-4 text-zinc-400" />;
      default:
        return <Wrench className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60">
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>03 / Capabilities & Architecture</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Technical Arsenal
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.skills.map((cat) => (
          <div
            key={cat.category}
            className="glass-panel p-6 rounded-xl border border-zinc-800/80 space-y-5 hover:border-zinc-700/80 transition-colors duration-250"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                {getCategoryIcon(cat.category)}
                <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-200">
                  {cat.category}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {cat.items.length} MODULES
              </span>
            </div>

            <div className="space-y-3.5">
              {cat.items.map((item) => (
                <div key={item.name} className="space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{item.name}</span>
                    <span className="text-zinc-500 text-[10px] uppercase">{item.level}</span>
                  </div>
                  {/* Subtle sleek progress bar */}
                  <div className="h-1 w-full rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-zinc-500/80 ${getLevelPercent(item.level)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
