import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          01 / About
        </h2>
        <h3 className="text-2xl font-bold font-display text-white">
          Background & Focus
        </h3>
      </div>

      <div className="space-y-6 text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
        <p>
          {portfolioData.bio}
        </p>
        <p>
          My work spans full-stack engineering, payment gateway implementations with strict uptime and security requirements, and custom container orchestration scheduling algorithms.
        </p>
      </div>

      {/* Education details */}
      <div className="mt-12 p-6 rounded-lg border border-zinc-800 bg-zinc-950/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
          <div>
            <h4 className="text-base font-semibold text-white font-mono">
              {portfolioData.education.degree}
            </h4>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              {portfolioData.education.institution} — {portfolioData.education.location}
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {portfolioData.education.period}
          </span>
        </div>

        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
            Key Academic Coursework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {portfolioData.education.relevantCoursework.map((course) => (
              <div key={course} className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
