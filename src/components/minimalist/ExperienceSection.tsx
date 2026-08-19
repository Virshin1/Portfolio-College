import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          02 / Experience
        </h2>
        <h3 className="text-2xl font-bold font-display text-white">
          Work & Contributions
        </h3>
      </div>

      <div className="space-y-8">
        {portfolioData.experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-4 hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-900 pb-3">
              <div>
                <h4 className="text-base font-semibold text-white font-mono">
                  {exp.role}
                </h4>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {exp.company} — {exp.location}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 bg-zinc-900">
                  {exp.type}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {exp.description.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  <span className="text-zinc-600 mt-1 font-mono">-</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
