import React from 'react';
import { SongLine, NotationSystem } from '../types/song';
import { transposeChord } from '../utils/chordTheory';

interface SongLineRendererProps {
  line: SongLine;
  transposeSemitones: number;
  notationSystem: NotationSystem;
  showChords: boolean;
  theme: 'vintage' | 'stage' | 'paper-clean';
  onChordClick?: (chord: string) => void;
  fontSizeMultiplier: number;
  isCompactSpacing?: boolean;
}

export const SongLineRenderer: React.FC<SongLineRendererProps> = ({
  line,
  transposeSemitones,
  notationSystem,
  showChords,
  theme,
  onChordClick,
  fontSizeMultiplier,
  isCompactSpacing = false,
}) => {
  const isDark = theme === 'stage';

  // Chord color styling: Cifra Club authentic #e60 terracotta orange
  const chordColorClass = isDark
    ? 'text-[#ff7a29] hover:text-[#ff9d5c]'
    : 'text-[#e60] hover:text-[#c40]';

  const formatChord = (c?: string) => {
    if (!c) return '';
    return transposeChord(c, transposeSemitones, notationSystem);
  };

  if (line.type === 'blank') {
    return <div className={isCompactSpacing ? 'h-1.5' : 'h-2.5'} />;
  }

  // Guitar tablature line (e.g. E|----7-----7-----0-----|)
  if (line.type === 'tab') {
    return (
      <div className={`overflow-x-auto ${isCompactSpacing ? 'my-0.5' : 'my-1'}`}>
        <pre
          className="font-mono text-xs sm:text-[13px] font-semibold text-[#1b1b1b] dark:text-amber-200 bg-amber-900/5 dark:bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-900/15 leading-tight select-text"
          style={{ fontSize: `${Math.max(11, 13 * fontSizeMultiplier)}px` }}
        >
          {line.text || line.tabText}
        </pre>
      </div>
    );
  }

  if (line.type === 'comment') {
    return (
      <div
        className={`italic text-vintage-faded dark:text-gray-400 font-book ${isCompactSpacing ? 'my-0.5' : 'my-1'}`}
        style={{ fontSize: `${15 * fontSizeMultiplier}px` }}
      >
        {line.text}
      </div>
    );
  }

  if (line.type === 'chord-only') {
    if (!showChords) return null;
    const rawText = line.text || '';
    const transposedChordsOnly = rawText.replace(
      /\b(SOL\*?|RE4?|DO9?|SI7?|mim?|sim?|lam?|rem?|dom?|fam?|solm?|LA#?|FA#?m?|MI7?|DO7?|RE7?|LA7?|SOL7?|DO|RE|MI|FA|SOL|LA|SI|G7M|G6|D6|A7M|Bm\/F#|Em\/G|A7M\/E|[CDEFGAB][#b]?(?:m|maj7|7|sus4|4|9|dim)?)\b/g,
      (match) => formatChord(match)
    );

    return (
      <div
        className={`font-mono font-bold tracking-wider flex flex-wrap gap-2 items-center ${isCompactSpacing ? 'my-0.5' : 'my-1'}`}
        style={{ fontSize: `${14.5 * fontSizeMultiplier}px` }}
      >
        <span className={`${chordColorClass} font-bold bg-amber-500/10 dark:bg-amber-400/10 px-2 py-0.5 rounded-md cursor-pointer transition-colors shadow-xs`}>
          {transposedChordsOnly}
        </span>
      </div>
    );
  }

  if (line.type === 'lyric-only') {
    return (
      <div
        className={`font-book text-[#1b1b1b] dark:text-gray-100 leading-snug tracking-normal select-text ${isCompactSpacing ? 'py-0.5' : 'py-0.5'}`}
        style={{ fontSize: `${18 * fontSizeMultiplier}px` }}
      >
        {line.text}
      </div>
    );
  }

  // Type 'lyric-chord': Token-based syllable-anchored layout (acordes arriba en #e60, letra abajo)
  return (
    <div
      className={`flex flex-wrap items-end gap-x-0.5 leading-none select-text ${isCompactSpacing ? 'my-0.5' : 'my-1'}`}
      style={{ fontSize: `${18 * fontSizeMultiplier}px` }}
    >
      {line.tokens?.map((token, idx) => {
        const transposed = token.chord ? formatChord(token.chord) : undefined;
        const hasChord = Boolean(transposed && showChords);
        const isTabPattern = /\([IVX0-9\-]+\)/.test(token.lyric);

        return (
          <span
            key={`token-${idx}`}
            className="inline-flex flex-col items-start relative max-w-full"
          >
            {/* Línea de acorde ARRIBA (#e60 Cifra Club) */}
            {showChords && (
              <span
                onClick={() => hasChord && onChordClick && onChordClick(token.chord!)}
                title={hasChord ? `Ver diagrama de ${transposed}` : undefined}
                className={`font-mono font-bold leading-none select-none pr-1 mb-0.5 ${chordColorClass} ${
                  hasChord
                    ? 'cursor-pointer hover:underline transition-transform active:scale-95'
                    : 'invisible pointer-events-none'
                }`}
                style={{ fontSize: `${Math.max(12, 14.5 * fontSizeMultiplier)}px` }}
              >
                {hasChord ? transposed : '\u00A0'}
              </span>
            )}

            {/* Línea de letra ABAJO (#1b1b1b) */}
            <span
              className={`font-book text-[#1b1b1b] dark:text-gray-100 leading-tight whitespace-pre ${
                isTabPattern
                  ? 'font-mono text-sm tracking-tight text-amber-900 dark:text-amber-300 font-semibold px-1 py-0.5 rounded bg-black/5 dark:bg-white/5'
                  : ''
              }`}
            >
              {token.lyric || '\u00A0'}
            </span>
          </span>
        );
      })}
    </div>
  );
};
