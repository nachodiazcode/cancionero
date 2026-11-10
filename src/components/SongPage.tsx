import React, { useState } from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { SongLineRenderer } from './SongLineRenderer';
import { SectionMarker } from './SectionMarker';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { getChordDiagram } from '../data/chordDatabase';
import { Columns, Square } from 'lucide-react';

interface SongPageProps {
  song: Song;
  transposeSemitones: number;
  notationSystem: NotationSystem;
  showChords: boolean;
  theme: ThemeMode;
  fontSizeMultiplier: number;
  onChordClick: (chord: string) => void;
  showMarginDiagrams?: boolean;
}

export const SongPage: React.FC<SongPageProps> = ({
  song,
  transposeSemitones,
  notationSystem,
  showChords,
  theme,
  fontSizeMultiplier,
  onChordClick,
  showMarginDiagrams = true,
}) => {
  // Allow toggling 2 columns for a single song on desktop/tablet to fit everything on screen!
  const [columnsCount, setColumnsCount] = useState<1 | 2>(1);

  // Get unique diagrams for this song
  const chordDiagrams = song.chords
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-3 sm:px-8 py-6 pb-36">
      <div
        className={`rounded-2xl p-6 sm:p-10 shadow-book-deep border transition-all ${
          theme === 'stage'
            ? 'bg-gray-900/95 border-gray-800 text-gray-100 shadow-2xl'
            : theme === 'vintage'
            ? 'bg-[#f8f4ea] border-amber-900/15 text-vintage-ink'
            : 'bg-white border-gray-200 text-gray-900 shadow-xl'
        }`}
      >
        {/* Song Header */}
        <header className="mb-6 border-b border-amber-900/15 dark:border-gray-800 pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-vintage-faded/70 dark:text-gray-400 font-semibold block mb-1">
              {song.artist}
            </span>
            <h1
              className="font-serif lowercase font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-vintage-ink dark:text-gray-50 leading-tight"
              style={{ fontSize: `${32 * fontSizeMultiplier}px` }}
            >
              {song.title}
            </h1>
            {song.subtitle && (
              <p className="font-serif italic text-vintage-faded dark:text-gray-400 text-sm mt-1">
                {song.subtitle}
              </p>
            )}
          </div>

          {/* Quick 1 / 2 Column Toggle for single songs (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-lg border border-amber-900/15 dark:border-gray-700 bg-black/5 dark:bg-white/5 text-xs">
            <button
              onClick={() => setColumnsCount(1)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${
                columnsCount === 1
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
              }`}
              title="Ver en 1 columna continua"
            >
              <Square className="w-3.5 h-3.5" />
              <span>1 Col</span>
            </button>
            <button
              onClick={() => setColumnsCount(2)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${
                columnsCount === 2
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
              }`}
              title="Dividir en 2 columnas para ver todo sin scrollear"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>2 Col (Ajustar)</span>
            </button>
          </div>
        </header>

        {/* Epigraph / Quote (e.g. Bertolt Brecht) */}
        {song.epigraph && (
          <div className="mb-6 max-w-2xl p-4 rounded-xl bg-amber-500/5 dark:bg-white/5 border-l-2 border-amber-800/40 dark:border-amber-400/40 italic font-book text-vintage-faded dark:text-gray-300">
            <p
              className="whitespace-pre-line leading-relaxed"
              style={{ fontSize: `${14.5 * fontSizeMultiplier}px` }}
            >
              {song.epigraph.quote}
            </p>
            <p className="mt-2 text-xs font-serif not-italic font-bold text-vintage-ink dark:text-gray-300">
              — {song.epigraph.author}
            </p>
          </div>
        )}

        {/* Intro Progression */}
        {song.intro && (
          <div
            className="mb-6 p-3 rounded-xl bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 dark:border-gray-800 font-mono text-sm max-w-xl"
            style={{ fontSize: `${14 * fontSizeMultiplier}px` }}
          >
            <span className="font-serif italic text-vintage-faded dark:text-gray-400 mr-2">
              introducción:
            </span>
            <span className="font-bold text-vintage-chord dark:text-amber-400 tracking-wide">
              {song.intro}
            </span>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lyrics Area (Optionally 2 columns on tablet/desktop) */}
          <div
            className={
              showMarginDiagrams && chordDiagrams.length > 0
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
            }
          >
            <div
              className={`space-y-6 ${
                columnsCount === 2
                  ? 'md:columns-2 md:gap-10 [column-fill:_balance]'
                  : ''
              }`}
            >
              {song.sections.map((section, sIdx) => (
                <div
                  key={`section-${sIdx}`}
                  className="break-inside-avoid-column space-y-1.5 mb-6"
                >
                  {/* Section Marker */}
                  {section.marker && (
                    <div className="mb-2">
                      <SectionMarker marker={section.marker} theme={theme} />
                    </div>
                  )}

                  {/* Lines */}
                  <div className="space-y-1">
                    {section.lines.map((line, lIdx) => (
                      <SongLineRenderer
                        key={`line-${sIdx}-${lIdx}`}
                        line={line}
                        transposeSemitones={transposeSemitones}
                        notationSystem={notationSystem}
                        showChords={showChords}
                        theme={theme}
                        onChordClick={onChordClick}
                        fontSizeMultiplier={fontSizeMultiplier}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Margin Chord Diagrams */}
          {showMarginDiagrams && chordDiagrams.length > 0 && showChords && (
            <aside className="lg:col-span-3 hidden lg:flex flex-col items-center gap-4 sticky top-24 pt-2 border-l border-amber-900/10 dark:border-gray-800 pl-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-vintage-faded dark:text-gray-400 font-bold">
                Acordes
              </span>
              {chordDiagrams.slice(0, 5).map((chord) => (
                <button
                  key={`margin-${chord.name}`}
                  onClick={() => onChordClick(chord.name)}
                  className="cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  title={`Ver digitación de ${chord.name}`}
                >
                  <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                </button>
              ))}
            </aside>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-4 border-t border-amber-900/15 dark:border-gray-800 flex justify-between items-center text-xs text-vintage-faded dark:text-gray-400 font-serif">
          <span>Canción completa</span>
          {song.pageNumber && (
            <div className="flex items-baseline gap-1">
              <span className="italic">página</span>
              <span className="font-mono font-bold text-sm text-vintage-ink dark:text-gray-200">
                {song.pageNumber}
              </span>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};
