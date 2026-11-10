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
}

export const SongLineRenderer: React.FC<SongLineRendererProps> = ({
  line,
  transposeSemitones,
  notationSystem,
  showChords,
  theme,
  onChordClick,
  fontSizeMultiplier,
}) => {
  const isDark = theme === 'stage';

  // Chord color styling
  const chordColorClass = isDark
    ? 'text-amber-400 hover:text-amber-300'
    : theme === 'vintage'
    ? 'text-vintage-chord hover:text-red-900'
    : 'text-blue-800 hover:text-blue-950';

  const formatChord = (c?: string) => {
    if (!c) return '';
    return transposeChord(c, transposeSemitones, notationSystem);
  };

  if (line.type === 'blank') {
    return <div className="h-3" />;
  }

  if (line.type === 'comment') {
    return (
      <div
        className="italic text-vintage-faded dark:text-gray-400 my-1 font-book"
        style={{ fontSize: `${15 * fontSizeMultiplier}px` }}
      >
        {line.text}
      </div>
    );
  }

  if (line.type === 'chord-only') {
    if (!showChords) return null;
    // Transpose chords in raw text if formatted as e.g. "rem - FA - DO - SOL"
    const rawText = line.text || '';
    const transposedChordsOnly = rawText.replace(
      /\b(SOL\*?|RE4?|DO9?|SI7?|mim?|sim?|lam?|rem?|dom?|fam?|solm?|LA#?|FA#?m?|MI7?|DO7?|RE7?|LA7?|SOL7?|DO|RE|MI|FA|SOL|LA|SI|[CDEFGAB][#b]?(?:m|maj7|7|sus4|4|9|dim)?)\b/g,
      (match) => formatChord(match)
    );

    return (
      <div
        className="font-mono font-bold tracking-wider my-1 flex flex-wrap gap-2 items-center"
        style={{ fontSize: `${14 * fontSizeMultiplier}px` }}
      >
        <span className={`${chordColorClass} bg-amber-500/10 dark:bg-amber-400/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors`}>
          {transposedChordsOnly}
        </span>
      </div>
    );
  }

  if (line.type === 'lyric-only') {
    return (
      <div
        className="font-book text-vintage-ink dark:text-gray-100 leading-relaxed tracking-normal select-text"
        style={{ fontSize: `${18 * fontSizeMultiplier}px` }}
      >
        {line.text}
      </div>
    );
  }

  // Type 'lyric-chord': Token-based syllable-anchored layout
  return (
    <div
      className="flex flex-wrap items-end gap-x-1 gap-y-1.5 my-1 leading-none select-text"
      style={{ fontSize: `${18 * fontSizeMultiplier}px` }}
    >
      {line.tokens?.map((token, idx) => {
        const transposed = token.chord ? formatChord(token.chord) : undefined;
        const hasChord = Boolean(transposed && showChords);

        // Check if token contains a tab run like "(VI-0-2-3-V-0)" or "(V-0)"
        const isTabPattern = /\([IVX0-9\-]+\)/.test(token.lyric);

        return (
          <span
            key={`token-${idx}`}
            className="inline-flex flex-col items-start relative max-w-full"
          >
            {/* Chord above syllable */}
            {hasChord && (
              <span
                onClick={() => onChordClick && onChordClick(token.chord!)}
                title={`Ver diagrama de ${transposed}`}
                className={`font-mono font-bold leading-none cursor-pointer hover:underline transition-transform active:scale-95 mb-1 ${chordColorClass}`}
                style={{ fontSize: `${Math.max(12, 14 * fontSizeMultiplier)}px` }}
              >
                {transposed}
              </span>
            )}

            {/* Lyric syllable */}
            <span
              className={`font-book text-vintage-ink dark:text-gray-100 leading-tight whitespace-pre ${
                isTabPattern ? 'font-mono text-sm tracking-tight text-amber-900 dark:text-amber-300 font-semibold' : ''
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
