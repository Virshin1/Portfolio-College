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

export function App() {
  const [view, setView] = useState<'intro' | 'minimalist' | 'terminal'>('intro');
  const [resumeOpen, setResumeOpen] = useState(false);

  // Global keyboard shortcut to toggle mode: Ctrl+G or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'g') || (e.metaKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setView((prev) => (prev === 'terminal' ? 'minimalist' : 'terminal'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEnterMinimalist = () => {
    setView('minimalist');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEnterTerminal = () => {
    setView('terminal');
  };

  const handleToggleMode = () => {
    setView((prev) => (prev === 'terminal' ? 'minimalist' : 'terminal'));
  };

  if (view === 'intro') {
    return (
      <div className="bg-black text-white min-h-screen">
        <LandingIntro
          onEnterMinimalist={handleEnterMinimalist}
          onEnterTerminal={handleEnterTerminal}
        />
        {/* PDF Resume Viewer & Downloader Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {view === 'minimalist' ? (
        <div className="relative flex flex-col min-h-screen">
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
        <div className="min-h-screen bg-black flex items-center justify-center">
          <TerminalView
            onToggleMode={handleToggleMode}
            onOpenResume={() => setResumeOpen(true)}
          />
        </div>
      )}

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
