import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/common/Icons";
import { ArrowUpRight, ExternalLink, Sparkles, Terminal } from "lucide-react";
import type { Project } from "@/types/portfolio";

export interface FeatureTab {
  value: string;
  icon: React.ReactNode;
  label: string;
  project: Project;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs: FeatureTab[];
  onOpenDetails?: (project: Project) => void;
}

export const Feature108: React.FC<Feature108Props> = ({
  badge = "04 / Work",
  heading = "Featured System Architectures",
  description = "Deep dive into selected distributed backends, container orchestration systems, and real-time infrastructure.",
  tabs,
  onOpenDetails,
}) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <Badge variant="outline" className="text-zinc-400 border-zinc-700 bg-zinc-900/60 font-mono text-[11px]">
          {badge}
        </Badge>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          {heading}
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl">
          {description}
        </p>
      </div>

      {/* Tabs */}
      <TabsPrimitive.Root defaultValue={tabs[0]?.value} className="w-full space-y-6">
        {/* Tab Selector Buttons */}
        <TabsPrimitive.List className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          {tabs.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-mono font-medium text-zinc-400 transition-all duration-200 cursor-pointer data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg hover:text-zinc-200"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        {/* Tab Content Cards */}
        {tabs.map((tab) => {
          const project = tab.project;
          return (
            <TabsPrimitive.Content
              key={tab.value}
              value={tab.value}
              className="glass-panel rounded-2xl border border-zinc-800/90 p-6 sm:p-8 lg:p-10 transition-all duration-300 focus-visible:outline-none animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Project Overview & Specs */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 uppercase">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          PRIMARY FOCUS
                        </span>
                      )}
                    </div>

                    <h4 className="text-2xl sm:text-4xl font-bold text-white font-mono tracking-tight">
                      {project.title}
                    </h4>

                    <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Highlights Bullet Points */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/60">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                        <span>System Highlights</span>
                      </div>
                      <div className="space-y-2 pt-1">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="text-xs sm:text-sm font-mono text-zinc-300 flex items-start gap-2.5">
                            <span className="text-zinc-500 font-bold select-none">›</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">
                      Technologies & Infrastructure
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="default"
                        size="lg"
                        className="gap-2 shadow-lg"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          <GithubIcon className="w-4 h-4" />
                          <span>View Codebase</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    )}

                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4 text-zinc-400" />
                          <span>Live System Demo</span>
                        </a>
                      </Button>
                    )}

                    {onOpenDetails && (
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => onOpenDetails(project)}
                        className="text-zinc-400 hover:text-white font-mono"
                      >
                        <span>Full Blueprint</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column: Architectural Terminal Preview Window */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden font-mono text-xs">
                    {/* Window Controls */}
                    <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <span className="text-[11px] text-zinc-400 ml-2">{project.id}.manifest.json</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                        ONLINE
                      </span>
                    </div>

                    {/* Interactive Code Preview Block */}
                    <div className="p-5 space-y-3 bg-black/60 text-zinc-300 leading-relaxed overflow-x-auto text-[11px] sm:text-xs">
                      <div className="text-zinc-500">// System Architecture Spec</div>
                      <div>
                        <span className="text-zinc-500">service</span>: <span className="text-emerald-400">"{project.title}"</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">category</span>: <span className="text-zinc-300">"{project.category}"</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">runtime</span>: <span className="text-zinc-300">[{project.techStack.map(t => `"${t}"`).join(', ')}]</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">status</span>: <span className="text-emerald-400">"Production Deployed"</span>
                      </div>
                      <div className="pt-2 border-t border-zinc-900 text-zinc-400 space-y-1">
                        <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Telemetry Metrics:</div>
                        <div className="flex justify-between text-zinc-300">
                          <span>Health Check</span>
                          <span className="text-emerald-400">200 OK</span>
                        </div>
                        <div className="flex justify-between text-zinc-300">
                          <span>Availability</span>
                          <span className="text-zinc-300">99.98%</span>
                        </div>
                      </div>
                    </div>

                    {/* Window Footer */}
                    <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between text-[10px] text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-zinc-400" />
                        <span>Ready for Inspection</span>
                      </div>
                      <span>ID: {project.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsPrimitive.Content>
          );
        })}
      </TabsPrimitive.Root>
    </div>
  );
};
