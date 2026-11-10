import React, { useState } from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { SongLineRenderer } from './SongLineRenderer';
import { SectionMarker } from './SectionMarker';
import { GuitarChordDiagram } from './GuitarChordDiagram';
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

  // Chords for right column diagrams (SOL*, RE4, DO9 from original scan)
  const playaGironDiagrams = ['SOL*', 'RE4', 'DO9']
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  // Chords for left song (e.g. rem, FA, LA#)
  const suenoDiagrams = ['SOL', 'rem', 'FA', 'DO']
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-4 pb-36">
      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden items-center justify-center gap-1 mb-4 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-900/15">
        <button
          onClick={() => setMobileTab('both')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'both'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
        >
          Vista Completa (2 Páginas)
        </button>
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'left'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
        >
          Sueño con serpientes
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'right'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
        >
          Playa Girón
        </button>
      </div>

      {/* Main Book Card */}
      <div
        className={`relative rounded-2xl p-5 sm:p-8 lg:p-12 shadow-book-deep transition-all border ${
          isDark
            ? 'bg-gray-900/95 border-gray-800 text-gray-100 shadow-2xl'
            : theme === 'vintage'
            ? 'bg-[#f8f4ea] border-amber-900/15 text-vintage-ink'
            : 'bg-white border-gray-200 text-gray-900 shadow-xl'
        }`}
      >
        {/* Subtle book spine center fold line for tablet/desktop */}
        <div className="hidden md:block absolute top-10 bottom-24 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-amber-900/15 dark:via-gray-700 to-transparent pointer-events-none" />

        {/* 2-Column Balanced Grid (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
          
          {/* ================= PÁGINA IZQUIERDA: Sueño con serpientes ================= */}
          {(mobileTab === 'both' || mobileTab === 'left') && (
            <article className="space-y-5 md:pr-4">
              {/* Header */}
              <div className="border-b border-amber-900/15 dark:border-gray-800 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-vintage-faded/70 dark:text-gray-400 font-semibold block mb-1">
                  silvio rodríguez
                </span>
                <h1
                  className="font-serif lowercase font-bold tracking-tight text-3xl sm:text-4xl text-vintage-ink dark:text-gray-50 leading-tight"
                  style={{ fontSize: `${30 * fontSizeMultiplier}px` }}
                >
                  {leftSong.title}
                </h1>
              </div>

              {/* Epígrafe de Bertolt Brecht */}
              {leftSong.epigraph && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-white/5 border-l-2 border-amber-800/40 dark:border-amber-400/40 italic font-book text-vintage-faded dark:text-gray-300">
                  <p
                    className="whitespace-pre-line leading-relaxed"
                    style={{ fontSize: `${13.5 * fontSizeMultiplier}px` }}
                  >
                    {leftSong.epigraph.quote}
                  </p>
                  <p className="mt-2 text-xs font-serif not-italic font-bold text-vintage-ink dark:text-gray-300">
                    — {leftSong.epigraph.author}
                  </p>
                </div>
              )}

              {/* Secciones de Sueño con Serpientes */}
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

              {/* Diagramas de acordes de apoyo al pie de la canción izquierda */}
              {showChords && (
                <div className="pt-4 border-t border-amber-900/10 dark:border-gray-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-vintage-faded dark:text-gray-400 mb-2">
                    Acordes principales:
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {suenoDiagrams.map((chord) => (
                      <button
                        key={`sueno-diag-${chord.name}`}
                        onClick={() => onChordClick(chord.name)}
                        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-transform hover:scale-105"
                        title={`Tocar ${chord.name}`}
                      >
                        <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}

          {/* ================= PÁGINA DERECHA: Playa Girón ================= */}
          {(mobileTab === 'both' || mobileTab === 'right') && (
            <article className="space-y-5 md:pl-4">
              {/* Header */}
              <div className="border-b border-amber-900/15 dark:border-gray-800 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-vintage-faded/70 dark:text-gray-400 font-semibold block mb-1">
                  silvio rodríguez
                </span>
                <h2
                  className="font-serif lowercase font-bold tracking-tight text-3xl sm:text-4xl text-vintage-ink dark:text-gray-50 leading-tight"
                  style={{ fontSize: `${30 * fontSizeMultiplier}px` }}
                >
                  {rightSong.title}
                </h2>
              </div>

              {/* Introducción */}
              {rightSong.intro && (
                <div
                  className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 dark:border-gray-800 font-mono text-xs sm:text-sm"
                  style={{ fontSize: `${13.5 * fontSizeMultiplier}px` }}
                >
                  <span className="font-serif italic text-vintage-faded dark:text-gray-400 mr-2">
                    introducción:
                  </span>
                  <span className="font-bold text-vintage-chord dark:text-amber-400 tracking-wide">
                    {rightSong.intro}
                  </span>
                </div>
              )}

              {/* Letras y Diagramas en paralelo */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Letras de Playa Girón */}
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

                {/* Columna lateral de diagramas de acordes (SOL*, RE4, DO9) */}
                {showChords && (
                  <aside className="hidden sm:flex flex-col items-center gap-4 shrink-0 p-3 rounded-xl bg-amber-500/5 dark:bg-white/5 border border-amber-900/10 dark:border-gray-800 self-start">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-vintage-faded dark:text-gray-400 font-bold">
                      Posiciones
                    </span>
                    {playaGironDiagrams.map((chord) => (
                      <button
                        key={`playa-diag-${chord.name}`}
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

              {/* Diagramas para móvil (horizontal abajo) */}
              {showChords && (
                <div className="flex sm:hidden items-center justify-around gap-2 pt-4 border-t border-amber-900/10 dark:border-gray-800">
                  {playaGironDiagrams.map((chord) => (
                    <button
                      key={`mobile-diag-${chord.name}`}
                      onClick={() => onChordClick(chord.name)}
                      className="cursor-pointer"
                    >
                      <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                    </button>
                  ))}
                </div>
              )}
            </article>
          )}

        </div>

        {/* Pie de página clásico de cancionero impreso */}
        <footer className="mt-12 pt-6 border-t border-amber-900/20 dark:border-gray-800 flex justify-between items-end">
          <div className="text-xs italic text-vintage-faded dark:text-gray-400 font-serif">
            Edición digital facsimilar · Vista libro
          </div>
          <div className="flex flex-col items-end">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-vintage-ink dark:text-gray-100 leading-none">
              19
            </span>
            <span className="font-serif italic text-lg sm:text-xl text-vintage-ink dark:text-gray-200 mt-1">
              cancionero
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
