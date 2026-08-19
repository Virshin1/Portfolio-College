import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Terminal, Database, Cloud, Code2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('cloud') || category.toLowerCase().includes('devops')) {
      return <Cloud className="w-4 h-4 text-zinc-400" />;
    }
    if (category.toLowerCase().includes('database') || category.toLowerCase().includes('monitoring')) {
      return <Database className="w-4 h-4 text-zinc-400" />;
    }
    if (category.toLowerCase().includes('languages')) {
      return <Terminal className="w-4 h-4 text-zinc-400" />;
    }
    return <Code2 className="w-4 h-4 text-zinc-400" />;
  };

  const getLevelPercent = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'w-[92%]';
      case 'advanced':
        return 'w-[85%]';
      case 'proficient':
        return 'w-[75%]';
      default:
        return 'w-[65%]';
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
            className="glass-panel p-6 rounded-xl border border-zinc-800/80 space-y-5 group hover:border-zinc-500 transition-all duration-300"
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
                      className={`h-full rounded-full bg-zinc-400/80 group-hover:bg-white transition-all duration-500 ${getLevelPercent(item.level)}`}
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
