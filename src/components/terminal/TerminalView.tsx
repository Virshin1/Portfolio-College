import React, { useState, useRef, useEffect } from 'react';
import { executeCommand, COMMANDS_LIST, VIRTUAL_FILES } from './commands';
import { TerminalOutput } from './TerminalOutput';
import { portfolioData } from '../../data/portfolioData';
import { Terminal as TerminalIcon, Layout, Download, Palette, Maximize2, Minimize2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  command: string;
  output: string;
  isError?: boolean;
}

interface TerminalViewProps {
  onToggleMode: () => void;
  onOpenResume: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ onToggleMode, onOpenResume }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [theme, setTheme] = useState<'monochrome' | 'cyber' | 'matrix' | 'dracula' | 'nord' | 'classic'>('monochrome');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const WELCOME_BANNER = `
VIRSHIN TERMINAL ENVIRONMENT [Version 2.4.0]
(c) 2026 ${portfolioData.name}. All rights reserved.

Type 'help' to view available commands.
Type 'gui' or press [Ctrl+G] to return to Minimalist GUI mode.
Type 'projects' to view projects or 'resume' to view CV.
  `;

  useEffect(() => {
    setHistory([
      {
        id: 'initial',
        command: 'welcome',
        output: WELCOME_BANNER,
      }
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleRunCommand = (cmdToRun?: string) => {
    const targetCommand = cmdToRun !== undefined ? cmdToRun : input;
    if (!targetCommand.trim()) return;

    const result = executeCommand(targetCommand);

    if (result.action === 'CLEAR') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: targetCommand,
          output: result.output,
          isError: result.isError,
        },
      ]);
    }

    setCommandHistory((prev) => [...prev, targetCommand]);
    setHistoryIndex(-1);
    setInput('');

    if (result.action === 'TOGGLE_MODE') {
      setTimeout(() => onToggleMode(), 300);
    } else if (result.action === 'OPEN_RESUME') {
      onOpenResume();
    } else if (result.action === 'CHANGE_THEME' && result.payload) {
      setTheme(result.payload as any);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRunCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      const matchedCmd = COMMANDS_LIST.find((c) => c.name.startsWith(trimmed));
      if (matchedCmd) {
        setInput(matchedCmd.name);
        return;
      }

      if (trimmed.startsWith('cat ')) {
        const filePrefix = trimmed.replace('cat ', '');
        const matchedFile = Object.keys(VIRTUAL_FILES).find((f) => f.startsWith(filePrefix));
        if (matchedFile) {
          setInput(`cat ${matchedFile}`);
        }
      }
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'matrix':
        return {
          bg: 'bg-black',
          border: 'border-emerald-900',
          text: 'text-emerald-400',
          prompt: 'text-emerald-500 font-bold',
          header: 'bg-zinc-950 border-zinc-800',
        };
      case 'cyber':
        return {
          bg: 'bg-zinc-950',
          border: 'border-cyan-900/60',
          text: 'text-zinc-200',
          prompt: 'text-cyan-400',
          header: 'bg-zinc-900 border-zinc-800',
        };
      case 'dracula':
        return {
          bg: 'bg-[#1e1f29]',
          border: 'border-[#44475a]',
          text: 'text-[#f8f8f2]',
          prompt: 'text-[#50fa7b]',
          header: 'bg-[#181920] border-[#383a59]',
        };
      case 'nord':
        return {
          bg: 'bg-[#242933]',
          border: 'border-[#3b4252]',
          text: 'text-[#eceff4]',
          prompt: 'text-[#88c0d0]',
          header: 'bg-[#1e222a] border-[#2e3440]',
        };
      case 'classic':
        return {
          bg: 'bg-[#121212]',
          border: 'border-zinc-800',
          text: 'text-zinc-300',
          prompt: 'text-zinc-400',
          header: 'bg-[#1a1a1a] border-zinc-800',
        };
      case 'monochrome':
      default:
        return {
          bg: 'bg-black',
          border: 'border-zinc-800',
          text: 'text-zinc-300',
          prompt: 'text-zinc-100 font-medium',
          header: 'bg-zinc-950 border-zinc-800',
        };
    }
  };

  const themeStyles = getThemeClasses();

  const quickCommands = [
    'help',
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'contact',
    'resume',
    'neofetch',
    'gui',
    'clear',
  ];

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 bg-black ${
        isFullScreen ? 'p-0' : ''
      }`}
      onClick={handleContainerClick}
    >
      <div
        className={`w-full ${
          isFullScreen ? 'h-screen rounded-none max-w-none' : 'max-w-4xl h-[86vh] rounded-xl'
        } flex flex-col border ${themeStyles.border} ${themeStyles.bg} shadow-2xl overflow-hidden`}
      >
        {/* Title Bar */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 ${themeStyles.header} border-b select-none`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleMode()}
              className="w-2.5 h-2.5 rounded-full bg-zinc-600 hover:bg-zinc-400 transition-colors cursor-pointer"
              title="Close -> Switch to Minimalist Mode"
            />
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="w-2.5 h-2.5 rounded-full bg-zinc-600 hover:bg-zinc-400 transition-colors cursor-pointer"
              title="Toggle full screen"
            />
            <button
              onClick={() => handleRunCommand('clear')}
              className="w-2.5 h-2.5 rounded-full bg-zinc-600 hover:bg-zinc-400 transition-colors cursor-pointer"
              title="Clear screen"
            />
            <span className="ml-3 text-xs font-mono text-zinc-400 hidden sm:inline flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
              virshin@dev:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black/60 border border-zinc-800 rounded px-2 py-0.5">
              <Palette className="w-3 h-3 text-zinc-500" />
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="bg-transparent text-[11px] font-mono text-zinc-400 focus:outline-none cursor-pointer"
              >
                <option value="monochrome">monochrome</option>
                <option value="cyber">cyber</option>
                <option value="matrix">matrix</option>
                <option value="dracula">dracula</option>
                <option value="nord">nord</option>
                <option value="classic">classic</option>
              </select>
            </div>

            <button
              onClick={onToggleMode}
              className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Switch to Minimalist GUI (Ctrl+G)"
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Minimalist GUI</span>
              <span className="text-[10px] text-zinc-500 font-mono">^G</span>
            </button>

            <button
              onClick={onOpenResume}
              className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="View Resume"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-zinc-950/80 border-b border-zinc-800/60 overflow-x-auto text-xs font-mono">
          <span className="text-[11px] text-zinc-600 shrink-0 mr-1">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                handleRunCommand(cmd);
              }}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-[11px] transition-colors shrink-0 cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command !== 'welcome' && (
                <div className="flex items-center gap-2">
                  <span className={themeStyles.prompt}>virshin@dev:~$</span>
                  <span className="text-zinc-100">{item.command}</span>
                </div>
              )}
              <TerminalOutput content={item.output} isError={item.isError} />
            </div>
          ))}

          {/* Prompt */}
          <div className="flex items-center gap-2 pt-1">
            <span className={themeStyles.prompt}>virshin@dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none ${themeStyles.text}`}
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Footer */}
        <div className="px-4 py-1.5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div>
            <span>Terminal CLI - Press TAB for autocomplete, UP/DOWN for history</span>
          </div>
          <div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
