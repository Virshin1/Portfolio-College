import React from 'react';
import { Download, X, ExternalLink, FileText } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-mono font-medium text-zinc-200">
              {portfolioData.name} - Curriculum Vitae
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Virshin_Resume.pdf"
              download="Virshin_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-white hover:bg-zinc-200 text-black text-xs font-mono font-medium transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </a>

            <a
              href="/Virshin_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="flex-1 w-full bg-zinc-900 min-h-[500px]">
          <iframe
            src="/Virshin_Resume.pdf#toolbar=0"
            className="w-full h-full border-0 min-h-[550px]"
            title="Virshin Resume PDF"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-black border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Virshin_Resume.pdf</span>
          <button
            onClick={onClose}
            className="hover:text-zinc-300 underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
