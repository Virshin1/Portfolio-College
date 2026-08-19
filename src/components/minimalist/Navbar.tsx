import React, { useState, useEffect } from 'react';
import { Terminal, Download, Menu, X } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';

interface NavbarProps {
  currentMode: 'minimalist' | 'terminal';
  onToggleMode: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMode, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#accomplishments' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded border border-white/20 bg-zinc-900 flex items-center justify-center text-white font-mono text-xs font-bold group-hover:border-white transition-colors">
            V
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight text-white">
            {portfolioData.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Switch to Terminal Mode (Ctrl+G)"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Terminal</span>
            <span className="text-[10px] text-zinc-600">^G</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded bg-white hover:bg-zinc-200 text-black font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>CV</span>
          </button>

          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleMode}
            className="p-1.5 rounded border border-zinc-800 text-zinc-300 text-xs font-mono flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-zinc-800 px-6 py-5">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-zinc-300 hover:text-white py-1.5 border-b border-zinc-900"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleMode();
                }}
                className="flex-1 py-2 text-xs font-mono rounded border border-zinc-800 text-zinc-300 flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal Mode</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 text-xs font-mono rounded bg-white text-black font-medium flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
