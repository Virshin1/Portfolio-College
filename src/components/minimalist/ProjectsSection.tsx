import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { GithubIcon } from '../common/Icons';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Cloud & DevOps', 'AI & Tools', 'Frontend'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            04 / Work
          </h2>
          <h3 className="text-2xl font-bold font-display text-white">
            Featured Projects
          </h3>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-medium'
                  : 'text-zinc-500 hover:text-zinc-300 bg-zinc-950 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-lg border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition-colors space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-3">
                <h4 className="text-base font-semibold text-white font-mono">
                  {project.title}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 bg-zinc-900">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.longDescription && (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline underline-offset-4 cursor-pointer ml-2"
                  >
                    Details
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {project.highlights.map((h, i) => (
                  <div key={i} className="text-xs font-mono text-zinc-500 flex items-start gap-2">
                    <span className="text-zinc-600 mt-0.5">-</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="max-w-lg w-full p-6 rounded-lg border border-zinc-700 bg-zinc-950 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="text-base font-semibold text-white font-mono">
                {selectedProject.title}
              </h4>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white text-xs font-mono cursor-pointer"
              >
                Close [x]
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {selectedProject.longDescription || selectedProject.description}
            </p>

            {selectedProject.highlights && (
              <div className="space-y-1.5 py-2">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Technical Architecture
                </div>
                {selectedProject.highlights.map((hl, i) => (
                  <div key={i} className="text-xs font-mono text-zinc-400 flex items-start gap-2">
                    <span className="text-zinc-600">-</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.techStack.map((t) => (
                <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs font-mono rounded bg-white text-black font-medium flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
