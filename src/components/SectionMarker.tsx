import React from 'react';

interface SectionMarkerProps {
  marker: string;
  theme?: 'vintage' | 'stage' | 'paper-clean';
}

export const SectionMarker: React.FC<SectionMarkerProps> = ({
  marker,
  theme = 'vintage',
}) => {
  const isDark = theme === 'stage';

  // Extract clean letter or string
  const clean = marker.replace(/[()]/g, '').trim();

  // If it's a single letter like A, B, C: render as circled stamp badge
  if (clean.length === 1) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-serif font-bold mr-2 select-none shrink-0 ${
          isDark
            ? 'border-gray-400 text-gray-200 bg-gray-800'
            : 'border-vintage-ink text-vintage-ink bg-transparent'
        }`}
        title={`Sección ${clean}`}
      >
        {clean}
      </span>
    );
  }

  // Otherwise, render as a nice pill or small label
  return (
    <span
      className={`inline-block text-xs uppercase tracking-wider font-mono font-semibold px-2 py-0.5 rounded mr-2 select-none ${
        isDark
          ? 'bg-gray-800 text-amber-300'
          : 'bg-amber-200/50 text-vintage-ink'
      }`}
    >
      {clean}
    </span>
  );
};
