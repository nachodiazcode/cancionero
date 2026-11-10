import React from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { SongLineRenderer } from './SongLineRenderer';
import { SectionMarker } from './SectionMarker';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { getChordDiagram } from '../data/chordDatabase';

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
  // Get unique diagrams for this song
  const chordDiagrams = song.chords
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-8 py-6 pb-28">
      {/* Song Header */}
      <div className="mb-6 border-b border-amber-900/15 dark:border-gray-800 pb-4">
        <h1
          className="font-serif lowercase font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-vintage-ink dark:text-gray-100"
          style={{ fontSize: `${32 * fontSizeMultiplier}px` }}
        >
          {song.title}
        </h1>
        {song.artist && (
          <p className="font-serif italic text-vintage-faded dark:text-gray-400 mt-1 text-sm sm:text-base">
            {song.artist} {song.subtitle ? `· ${song.subtitle}` : ''}
          </p>
        )}
      </div>

      {/* Main Grid: Lyrics on Left, Chord diagrams on right (just like the book!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Main Lyrics Area */}
        <div className={showMarginDiagrams && chordDiagrams.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'}>
          {/* Epigraph / Quote (e.g. Bertolt Brecht) */}
          {song.epigraph && (
            <div className="mb-6 pl-4 border-l-2 border-vintage-faded/40 dark:border-gray-700 italic font-book text-vintage-faded dark:text-gray-300">
              <p
                className="whitespace-pre-line leading-relaxed"
                style={{ fontSize: `${15 * fontSizeMultiplier}px` }}
              >
                {song.epigraph.quote}
              </p>
              <p
                className="mt-2 text-xs font-semibold not-italic text-vintage-ink dark:text-gray-400"
              >
                {song.epigraph.author}
              </p>
            </div>
          )}

          {/* Intro Box */}
          {song.intro && (
            <div
              className="mb-5 p-2.5 rounded-lg bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 dark:border-gray-800 font-mono text-sm"
              style={{ fontSize: `${14 * fontSizeMultiplier}px` }}
            >
              <span className="font-serif italic text-vintage-faded dark:text-gray-400 mr-2">
                introducción:
              </span>
              <span className="font-bold text-vintage-chord dark:text-amber-400">
                {song.intro}
              </span>
            </div>
          )}

          {/* Song Sections */}
          <div className="space-y-6">
            {song.sections.map((section, sIdx) => (
              <div key={`section-${sIdx}`} className="relative pl-0 sm:pl-2">
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

        {/* Right Margin Chord Diagrams (Fretboards matching the book) */}
        {showMarginDiagrams && chordDiagrams.length > 0 && (
          <aside className="lg:col-span-3 hidden lg:flex flex-col items-center gap-4 sticky top-24 pt-2 border-l border-amber-900/10 dark:border-gray-800 pl-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-vintage-faded dark:text-gray-400 font-semibold mb-1">
              Acordes
            </div>
            {chordDiagrams.slice(0, 5).map((chord) => (
              <div
                key={`margin-${chord.name}`}
                onClick={() => onChordClick(chord.name)}
                className="cursor-pointer hover:scale-105 transition-transform"
                title={`Ver digitación de ${chord.name}`}
              >
                <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
              </div>
            ))}
          </aside>
        )}
      </div>

      {/* Song Footnote / Page details */}
      <footer className="mt-12 pt-4 border-t border-amber-900/15 dark:border-gray-800 flex justify-between items-center text-xs text-vintage-faded dark:text-gray-400 font-serif">
        <span>{song.notes || 'Canción completa'}</span>
        {song.pageNumber && (
          <span className="font-mono font-bold text-sm">
            {song.pageNumber}
          </span>
        )}
      </footer>
    </div>
  );
};
