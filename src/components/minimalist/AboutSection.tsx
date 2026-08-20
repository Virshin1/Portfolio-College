import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60">
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Compass className="w-3.5 h-3.5 text-zinc-400" />
          <span>01 / Background & Focus</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Engineering Perspective
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Bio */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          <p className="border-l-2 border-zinc-700 pl-4 py-1 text-zinc-200">
            {portfolioData.bio}
          </p>
          <p className="text-zinc-400">
            My engineering work emphasizes distributed fault-tolerant architectures, automated CI/CD deployment pipelines, and zero-downtime microservices. I enjoy exploring systems programming in Golang, deep container orchestration internals with Kubernetes, and crafting clean developer tooling.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full-Stack Systems</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloud & Container Ops</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time WebSockets</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/40 p-2.5 rounded border border-zinc-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terminal CLI Systems</span>
            </div>
          </div>
        </div>

        {/* Right Education Card */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 rounded-xl border border-zinc-800/80 space-y-5">
            <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <GraduationCap className="w-4 h-4 text-zinc-300" />
                  <span>Academic Degree</span>
                </div>
                <h4 className="text-base font-bold text-white font-mono">
                  {portfolioData.education.degree}
                </h4>
                <div className="text-xs font-mono text-zinc-400">
                  {portfolioData.education.institution}
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-300">
                {portfolioData.education.period}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                <span>Core Engineering Coursework</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(portfolioData.education.relevantCoursework || portfolioData.education.focus || []).map((course) => (
                  <span
                    key={course}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
