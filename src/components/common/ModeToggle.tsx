import React from 'react';
import { Terminal, Layout } from 'lucide-react';

interface ModeToggleProps {
  currentMode: 'minimalist' | 'terminal';
  onToggle: () => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer"
        title={`Switch to ${currentMode === 'minimalist' ? 'Terminal' : 'Minimalist'} Mode (Ctrl+G)`}
      >
        {currentMode === 'minimalist' ? (
          <>
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-mono">Terminal [^G]</span>
          </>
        ) : (
          <>
            <Layout className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-mono">Minimalist [^G]</span>
          </>
        )}
      </button>
    </div>
  );
};
