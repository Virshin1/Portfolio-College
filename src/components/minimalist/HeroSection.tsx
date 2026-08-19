import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { Terminal, ArrowUpRight, Cpu, Layers, Server, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onToggleMode: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onToggleMode, onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'stack' | 'specs'>('architecture');

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
        {/* Top Status & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 text-emerald-400 font-mono text-xs shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Internships & Engineering Roles</span>
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center gap-3 bg-zinc-950/60 px-3 py-1 rounded-full border border-zinc-800/60 backdrop-blur-sm">
            <span>NAV-MUMBAI [IST / UTC+5:30]</span>
            <span className="text-zinc-700">|</span>
            <span>SYS_OK</span>
          </div>
        </div>

        {/* Hero Main Header & System HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Full-Stack & Cloud Systems Engineer
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 drop-shadow-sm">
                {portfolioData.name}
              </h1>
              <p className="text-lg sm:text-xl font-mono text-zinc-300 font-light">
                {portfolioData.tagline}
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              Undergraduate at {portfolioData.education.institution} specializing in high-throughput backend services, Kubernetes orchestration, real-time telemetry systems, and modern web architectures.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-md bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-white/10 hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onToggleMode}
                className="px-5 py-3 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 font-mono text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer group backdrop-blur-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span>Launch Terminal Mode</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-3 rounded-md border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-xs transition-colors cursor-pointer backdrop-blur-sm"
              >
                Resume PDF
              </button>

              <a
                href={portfolioData.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-md border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors backdrop-blur-sm"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive System Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-xl overflow-hidden border border-zinc-800/80 shadow-2xl backdrop-blur-md">
              {/* Window Header */}
              <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="text-[11px] font-mono text-zinc-400 ml-2">sys_inspector.v2</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${activeTab === 'architecture' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Arch
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${activeTab === 'stack' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Stack
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${activeTab === 'specs' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Specs
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-5 font-mono text-xs space-y-4 bg-zinc-950/70">
                {activeTab === 'architecture' && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Layers className="w-3.5 h-3.5 text-zinc-400" />
                        Focus Areas
                      </span>
                      <span className="text-zinc-500 text-[10px]">PRODUCTION READY</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-zinc-900/60 p-2 rounded border border-zinc-800/40">
                        <span className="text-zinc-300">Distributed Backends</span>
                        <span className="text-zinc-500 text-[11px]">Go / Node / Python</span>
                      </div>
                      <div className="flex justify-between items-center bg-zinc-900/60 p-2 rounded border border-zinc-800/40">
                        <span className="text-zinc-300">Container Infra</span>
                        <span className="text-zinc-500 text-[11px]">Docker / K8s / CI-CD</span>
                      </div>
                      <div className="flex justify-between items-center bg-zinc-900/60 p-2 rounded border border-zinc-800/40">
                        <span className="text-zinc-300">Real-Time Transit Systems</span>
                        <span className="text-zinc-500 text-[11px]">WebSockets / Redis</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Server className="w-3.5 h-3.5 text-zinc-400" />
                        Core Tooling
                      </span>
                      <span className="text-zinc-500 text-[10px]">VERIFIED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/40 text-zinc-300">TypeScript / React</div>
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/40 text-zinc-300">Golang / Python</div>
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/40 text-zinc-300">PostgreSQL / Redis</div>
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/40 text-zinc-300">AWS / Terraform / K8s</div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                        System Profile
                      </span>
                      <span className="text-zinc-500 text-[10px]">ACTIVE</span>
                    </div>
                    <div className="space-y-1.5 text-zinc-400 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Degree Status</span>
                        <span className="text-zinc-200">B.Tech 2nd Year (2024-28)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Hackathons</span>
                        <span className="text-zinc-200">Buildathon 3.0 Finalist</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Terminal Shell</span>
                        <span className="text-zinc-200">Interactive UNIX CLI Built-in</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer telemetry */}
                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Integrity Verified</span>
                  </div>
                  <span>Ctrl+G for CLI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-zinc-800/60">
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Degree</div>
            <div className="text-sm font-mono text-zinc-200 font-medium mt-1">B.Tech CSE (2024–2028)</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Institution</div>
            <div className="text-sm font-mono text-zinc-200 font-medium mt-1">ITM Skills University</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Primary Stack</div>
            <div className="text-sm font-mono text-zinc-200 font-medium mt-1">Cloud, DevOps & Distributed</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Location</div>
            <div className="text-sm font-mono text-zinc-200 font-medium mt-1">Navi Mumbai, India</div>
          </div>
        </div>
      </div>
    </section>
  );
};
