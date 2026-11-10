import React, { useState } from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { SongLineRenderer } from './SongLineRenderer';
import { SectionMarker } from './SectionMarker';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { VintageTotemArt } from './VintageTotemArt';
import { getChordDiagram } from '../data/chordDatabase';

interface BookSpreadViewProps {
  leftSong: Song;
  rightSong: Song;
  transposeSemitones: number;
  notationSystem: NotationSystem;
  showChords: boolean;
  theme: ThemeMode;
  fontSizeMultiplier: number;
  onChordClick: (chord: string) => void;
}

export const BookSpreadView: React.FC<BookSpreadViewProps> = ({
  leftSong,
  rightSong,
  transposeSemitones,
  notationSystem,
  showChords,
  theme,
  fontSizeMultiplier,
  onChordClick,
}) => {
  const [mobileTab, setMobileTab] = useState<'both' | 'left' | 'right'>('both');
  const isDark = theme === 'stage';

  // Chords for right column diagrams (SOL*, RE4, DO9 as in the original picture)
  const playaGironDiagrams = ['SOL*', 'RE4', 'DO9']
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 py-4 pb-32">
      {/* Mobile Tab Switcher (Visible only on small screens) */}
      <div className="flex md:hidden items-center justify-center gap-1 mb-4 p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-amber-900/15">
        <button
          onClick={() => setMobileTab('both')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all ${
            mobileTab === 'both'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink'
          }`}
        >
          Vista Completa (2 Canciones)
        </button>
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all ${
            mobileTab === 'left'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink'
          }`}
        >
          Sueño con serpientes
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all ${
            mobileTab === 'right'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink'
          }`}
        >
          Playa Girón
        </button>
      </div>

      {/* Book Spread Container */}
      <div
        className={`relative rounded-xl p-4 sm:p-8 md:p-10 shadow-book transition-all border ${
          isDark
            ? 'bg-gray-900 border-gray-800 text-gray-100'
            : theme === 'vintage'
            ? 'bg-[#f7f2e7] border-vintage-faded/20 text-vintage-ink shadow-book-deep'
            : 'bg-white border-gray-200 text-gray-900 shadow-md'
        }`}
      >
        {/* Top Header of the spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline border-b border-amber-900/15 dark:border-gray-800 pb-3 mb-6">
          <div className="md:col-span-5">
            <h2
              className="font-serif lowercase font-bold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-vintage-ink dark:text-gray-100"
              style={{ fontSize: `${28 * fontSizeMultiplier}px` }}
            >
              {leftSong.title}
            </h2>
          </div>
          <div className="hidden md:block md:col-span-2 text-center text-xs font-serif italic text-vintage-faded/60">
            página 19
          </div>
          <div className="md:col-span-5 text-left md:text-left">
            <h2
              className="font-serif lowercase font-bold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-vintage-ink dark:text-gray-100"
              style={{ fontSize: `${28 * fontSizeMultiplier}px` }}
            >
              {rightSong.title}
            </h2>
          </div>
        </div>

        {/* 3-Column Layout: Left Song (5 cols), Center Totem Art (2 cols), Right Song (5 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= LEFT SONG: Sueño con serpientes ================= */}
          {(mobileTab === 'both' || mobileTab === 'left') && (
            <div className="md:col-span-5 space-y-4">
              {/* Epigraph */}
              {leftSong.epigraph && (
                <div className="mb-5 italic font-book text-vintage-faded dark:text-gray-300">
                  <p
                    className="whitespace-pre-line leading-relaxed"
                    style={{ fontSize: `${13.5 * fontSizeMultiplier}px` }}
                  >
                    {leftSong.epigraph.quote}
                  </p>
                  <p className="mt-1.5 text-xs font-serif not-italic font-bold text-vintage-ink dark:text-gray-400">
                    {leftSong.epigraph.author}
                  </p>
                </div>
              )}

              {/* Sections for Sueño con Serpientes */}
              <div className="space-y-4">
                {leftSong.sections.map((section, sIdx) => (
                  <div key={`left-sec-${sIdx}`} className="space-y-1">
                    {section.marker && (
                      <div className="inline-block mb-1">
                        <SectionMarker marker={section.marker} theme={theme} />
                      </div>
                    )}
                    {section.lines.map((line, lIdx) => (
                      <SongLineRenderer
                        key={`left-line-${sIdx}-${lIdx}`}
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
                ))}
              </div>
            </div>
          )}

          {/* ================= CENTER COLUMN: Vintage Totem Serpent Art ================= */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-start sticky top-24 self-start px-1">
            <VintageTotemArt theme={theme} className="w-full max-w-[130px]" />
          </div>

          {/* ================= RIGHT SONG: Playa Girón ================= */}
          {(mobileTab === 'both' || mobileTab === 'right') && (
            <div className="md:col-span-5 space-y-4">
              {/* Introduction chord progression */}
              {rightSong.intro && (
                <div
                  className="font-mono text-xs sm:text-sm mb-3"
                  style={{ fontSize: `${13 * fontSizeMultiplier}px` }}
                >
                  <span className="font-serif italic text-vintage-faded dark:text-gray-400 mr-2">
                    introducción:
                  </span>
                  <span className="font-bold text-vintage-chord dark:text-amber-400">
                    {rightSong.intro}
                  </span>
                </div>
              )}

              {/* Flex container for lyrics and margin diagrams */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Lyrics Area */}
                <div className="flex-1 space-y-4">
                  {rightSong.sections.map((section, sIdx) => (
                    <div key={`right-sec-${sIdx}`} className="space-y-1">
                      {section.marker && (
                        <div className="inline-block mb-1">
                          <SectionMarker marker={section.marker} theme={theme} />
                        </div>
                      )}
                      {section.lines.map((line, lIdx) => (
                        <SongLineRenderer
                          key={`right-line-${sIdx}-${lIdx}`}
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
                  ))}
                </div>

                {/* Right Margin Chord Diagrams (SOL*, RE4, DO9 from original scan) */}
                <div className="hidden sm:flex flex-col items-center gap-3 shrink-0 pt-1">
                  {playaGironDiagrams.map((chord) => (
                    <div
                      key={`playa-diag-${chord.name}`}
                      onClick={() => onChordClick(chord.name)}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title={`Ver digitación de ${chord.name}`}
                    >
                      <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Chord Diagrams (shown horizontally if on mobile screen) */}
              <div className="flex sm:hidden items-center justify-around gap-2 pt-4 border-t border-amber-900/10">
                {playaGironDiagrams.map((chord) => (
                  <div
                    key={`mobile-diag-${chord.name}`}
                    onClick={() => onChordClick(chord.name)}
                    className="cursor-pointer"
                  >
                    <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spread Footer matching original book: page 19 & "cancionero" */}
        <div className="mt-12 pt-4 border-t border-amber-900/20 dark:border-gray-800 flex justify-between items-end">
          <div className="text-xs italic text-vintage-faded dark:text-gray-400 font-serif">
            Edición facsimilar restaurada
          </div>
          <div className="flex flex-col items-end">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-vintage-ink dark:text-gray-100 leading-none">
              19
            </span>
            <span className="font-serif italic text-lg sm:text-xl text-vintage-ink dark:text-gray-200 mt-1">
              cancionero
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
