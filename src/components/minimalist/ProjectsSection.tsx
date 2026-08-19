import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { Feature108, type FeatureTab } from '../ui/feature108';
import { GithubIcon } from '../common/Icons';
import { ArrowUpRight, Code, ExternalLink, Sparkles, Zap, Server, Cpu, Layout, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Cloud & DevOps', 'AI & Tools', 'Frontend'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  // Map top featured projects to Feature108 tabs from card_section.md
  const getTabIcon = (projectId: string) => {
    switch (projectId) {
      case 'transit-live':
        return <Zap className="w-4 h-4 text-zinc-300 shrink-0" />;
      case 'ps-120':
        return <Server className="w-4 h-4 text-zinc-300 shrink-0" />;
      case 'ai-tools':
        return <Cpu className="w-4 h-4 text-zinc-300 shrink-0" />;
      case 'hero-motocorp':
        return <Layers className="w-4 h-4 text-zinc-300 shrink-0" />;
      default:
        return <Layout className="w-4 h-4 text-zinc-300 shrink-0" />;
    }
  };

  const featureTabs: FeatureTab[] = portfolioData.projects.slice(0, 5).map((project) => ({
    value: project.id,
    icon: getTabIcon(project.id),
    label: project.title,
    project: project,
  }));

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60 relative space-y-16">
      {/* 1. Feature108 Interactive Tab Showcase from card_section.md */}
      <Feature108
        badge="04 / System Engineering"
        heading="Interactive Project Showcase"
        description="Explore the architecture, real-time telemetry, and codebase structure of my primary software engineering systems."
        tabs={featureTabs}
        onOpenDetails={(project) => setSelectedProject(project)}
      />

      {/* 2. All Filterable Projects Grid */}
      <div className="pt-12 border-t border-zinc-800/60 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <Code className="w-3.5 h-3.5 text-zinc-400" />
              <span>Full Repository Catalog</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
              All Engineered Works
            </h4>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-100 text-black font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 rounded-xl border border-zinc-800/80 flex flex-col justify-between group hover:border-zinc-500 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Bar */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-700/60 bg-zinc-900/60 text-zinc-300 mb-2">
                      {project.category}
                    </div>
                    <h5 className="text-lg font-bold text-white font-mono group-hover:text-zinc-100 transition-colors">
                      {project.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-all cursor-pointer"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-all cursor-pointer"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1.5 mb-6 bg-zinc-950/40 p-3 rounded-lg border border-zinc-900">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="text-xs font-mono text-zinc-400 flex items-start gap-2">
                        <span className="text-zinc-600 select-none">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Tech Tags */}
              <div className="pt-4 border-t border-zinc-900/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-600">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {project.longDescription && (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold font-mono text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-500 hover:text-white font-mono text-sm px-2 py-1 border border-zinc-800 rounded cursor-pointer"
              >
                ESC [x]
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-300">
              <p className="leading-relaxed font-light">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {selectedProject.highlights && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs uppercase text-zinc-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-zinc-400" />
                    <span>Technical Highlights</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400">
                        <span className="text-zinc-600">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800">
                <div className="text-xs uppercase text-zinc-500 mb-2">Stack & Architecture</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-white text-black font-mono text-xs font-semibold flex items-center gap-2 hover:bg-zinc-200"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
