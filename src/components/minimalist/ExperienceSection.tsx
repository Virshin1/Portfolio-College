import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60">
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
          <span>02 / Career & Internships</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Work Experience
        </h3>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-zinc-800/80 space-y-10">
        {portfolioData.experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Subtle Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 transition-colors" />
            </div>

            {/* Experience Card */}
            <div className="glass-panel p-6 rounded-xl border border-zinc-800/80 space-y-4 hover:border-zinc-700/80 transition-colors duration-250">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div>
                  <h4 className="text-lg font-bold text-white font-mono">
                    {exp.role}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
                    <span className="text-zinc-200 font-medium">{exp.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    {exp.period}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded border border-zinc-700 text-zinc-300 bg-zinc-900 uppercase">
                    {exp.type}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {exp.description.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    <span className="text-zinc-500 mt-0.5 font-mono select-none">›</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800/80 text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
