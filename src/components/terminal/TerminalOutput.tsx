import React from 'react';

interface TerminalOutputProps {
  content: string;
  isError?: boolean;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ content, isError }) => {
  if (!content) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const renderFormattedLine = (line: string, index: number) => {
    if (isError) {
      return (
        <div key={index} className="text-red-400 font-mono text-xs sm:text-sm">
          {line}
        </div>
      );
    }

    const isDivider = line.startsWith('---') || line.startsWith('===');
    const isHeading = line.startsWith('[') && line.endsWith(']');
    const parts = line.split(urlRegex);

    return (
      <div
        key={index}
        className={`font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
          isDivider
            ? 'text-zinc-700 font-normal'
            : isHeading
            ? 'text-zinc-100 font-semibold'
            : 'text-zinc-300'
        }`}
      >
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-100 underline underline-offset-2 hover:text-white transition-colors cursor-pointer"
              >
                {part}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  const lines = content.split('\n');

  return (
    <div className="space-y-0.5 my-1">
      {lines.map((line, idx) => renderFormattedLine(line, idx))}
    </div>
  );
};
