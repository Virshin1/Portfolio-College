import { useState, useEffect } from 'react';
import { LandingIntro } from './components/intro/LandingIntro';
import { Navbar } from './components/minimalist/Navbar';
import { HeroSection } from './components/minimalist/HeroSection';
import { AboutSection } from './components/minimalist/AboutSection';
import { ExperienceSection } from './components/minimalist/ExperienceSection';
import { SkillsSection } from './components/minimalist/SkillsSection';
import { ProjectsSection } from './components/minimalist/ProjectsSection';
import { Accomplishments } from './components/minimalist/Accomplishments';
import { ContactSection } from './components/minimalist/ContactSection';
import { Footer } from './components/minimalist/Footer';
import { TerminalView } from './components/terminal/TerminalView';
import { ModeToggle } from './components/common/ModeToggle';
import { ResumeModal } from './components/common/ResumeModal';
import { SpiralAnimation } from './components/ui/spiral-animation';

export function App() {
  const [view, setView] = useState<'intro' | 'minimalist' | 'terminal'>('intro');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'terminal' | 'minimalist' | null>(null);

  // Global keyboard shortcut to toggle mode: Ctrl+G or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'g') || (e.metaKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        triggerTransition(view === 'terminal' ? 'minimalist' : 'terminal');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  const triggerTransition = (target: 'minimalist' | 'terminal') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionTarget(target);

    // 1700ms transition to allow the full 3D spiral particle vortex to unfold smoothly
    setTimeout(() => {
      setView(target);
      if (target === 'minimalist') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionTarget(null);
      }, 200);
    }, 1700);
  };

  const handleEnterMinimalist = () => {
    triggerTransition('minimalist');
  };

  const handleEnterTerminal = () => {
    triggerTransition('terminal');
  };

  const handleToggleMode = () => {
    triggerTransition(view === 'terminal' ? 'minimalist' : 'terminal');
  };

  if (view === 'intro') {
    return (
      <div className="bg-black text-white min-h-screen relative overflow-hidden">
        {/* Spiral Transition Overlay */}
        {isTransitioning && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-300 pointer-events-none select-none">
            <div className="absolute inset-0 w-full h-full">
              <SpiralAnimation duration={1.8} repeat={0} />
            </div>
            <div className="absolute bottom-12 z-10 text-[11px] font-mono tracking-[0.35em] text-zinc-500 uppercase font-light">
              {transitionTarget === 'terminal' ? 'initializing shell' : 'entering portfolio'}
            </div>
          </div>
        )}

        <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <LandingIntro
            onEnterMinimalist={handleEnterMinimalist}
            onEnterTerminal={handleEnterTerminal}
          />
        </div>

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      {/* 3D Spiral Transition Animation Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-300 pointer-events-none select-none">
          <div className="absolute inset-0 w-full h-full">
            <SpiralAnimation duration={1.8} repeat={0} />
          </div>
          <div className="absolute bottom-12 z-10 flex flex-col items-center gap-2">
            <div className="text-[11px] font-mono tracking-[0.35em] text-zinc-500 uppercase font-light">
              {transitionTarget === 'terminal' ? 'connecting shell' : 'loading interface'}
            </div>
          </div>
        </div>
      )}

      {/* Main Views */}
      <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {view === 'minimalist' ? (
          <div className="relative flex flex-col min-h-screen animate-in fade-in duration-200">
            <Navbar
              currentMode={view}
              onToggleMode={handleToggleMode}
              onOpenResume={() => setResumeOpen(true)}
            />

            <main className="flex-1">
              <HeroSection
                onToggleMode={handleToggleMode}
                onOpenResume={() => setResumeOpen(true)}
              />
              <AboutSection />
              <ExperienceSection />
              <SkillsSection />
              <ProjectsSection />
              <Accomplishments />
              <ContactSection />
            </main>

            <Footer onToggleMode={handleToggleMode} />
          </div>
        ) : (
          <div className="min-h-screen bg-black flex items-center justify-center animate-terminal-enter">
            <TerminalView
              onToggleMode={handleToggleMode}
              onOpenResume={() => setResumeOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Floating Mode Switcher */}
      <ModeToggle currentMode={view} onToggle={handleToggleMode} />

      {/* PDF Resume Viewer & Downloader Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default App;
