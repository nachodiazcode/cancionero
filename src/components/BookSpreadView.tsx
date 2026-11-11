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
  isFittedScreen?: boolean;
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
  isFittedScreen = false,
}) => {
  const [mobileTab, setMobileTab] = useState<'both' | 'left' | 'right'>('both');
  const [showFullEpigraph, setShowFullEpigraph] = useState<boolean>(false);
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
    <div
      className={`w-full max-w-7xl mx-auto transition-all ${
        isFittedScreen ? 'px-1 sm:px-4 py-1 pb-20' : 'px-2 sm:px-6 py-4 pb-36'
      }`}
    >
      {/* Vista / Canción Switcher (Disponible tanto en móvil como en escritorio para no hacer scroll) */}
      <div className="flex items-center justify-center gap-1 mb-3 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-900/15 max-w-xl mx-auto text-xs">
        <button
          onClick={() => setMobileTab('both')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
            mobileTab === 'both'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
          title="Ver ambas páginas enfrentadas"
        >
          📖 Ambas (Pág. 19)
        </button>
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
            mobileTab === 'left'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
          title="Ver solo Sueño con serpientes en 2 columnas para no scrollear"
        >
          Sueño con serpientes
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all ${
            mobileTab === 'right'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
          }`}
          title="Ver solo Playa Girón en 2 columnas para no scrollear"
        >
          Playa Girón
        </button>
      </div>

      {/* Main Book Card */}
      <div
        className={`relative rounded-2xl transition-all border ${
          isFittedScreen
            ? 'p-3 sm:p-6 lg:p-7 shadow-lg'
            : 'p-5 sm:p-8 lg:p-12 shadow-book-deep'
        } ${
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

              {/* Epígrafe de Bertolt Brecht (Compacto por defecto para no gastar espacio en pantalla) */}
              {leftSong.epigraph && (
                <div
                  onClick={() => setShowFullEpigraph((prev) => !prev)}
                  className={`rounded-xl bg-amber-500/5 dark:bg-white/5 border-l-2 border-amber-800/40 dark:border-amber-400/40 italic font-book text-vintage-faded dark:text-gray-300 cursor-pointer transition-all ${
                    !showFullEpigraph
                      ? 'p-2 text-xs flex items-center justify-between gap-2 mb-2'
                      : 'p-3 text-xs sm:text-sm mb-3'
                  }`}
                  title="Clic para ver/ocultar epígrafe completo de Bertolt Brecht"
                >
                  {!showFullEpigraph ? (
                    <>
                      <p className="truncate">
                        “Hay hombres que luchan un día y son buenos… Esos son los imprescindibles”.
                      </p>
                      <span className="font-serif not-italic font-bold text-[10px] text-vintage-ink dark:text-gray-300 whitespace-nowrap">
                        — B. Brecht ▾
                      </span>
                    </>
                  ) : (
                    <>
                      <p
                        className="whitespace-pre-line leading-relaxed"
                        style={{ fontSize: `${13 * fontSizeMultiplier}px` }}
                      >
                        {leftSong.epigraph.quote}
                      </p>
                      <p className="mt-1 text-xs font-serif not-italic font-bold text-vintage-ink dark:text-gray-300">
                        — {leftSong.epigraph.author} ▴
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Secciones de Sueño con Serpientes */}
              <div
                className={
                  mobileTab === 'left'
                    ? 'columns-1 md:columns-2 gap-8 [column-fill:_balance]'
                    : isFittedScreen
                    ? 'space-y-2'
                    : 'space-y-4'
                }
              >
                {leftSong.sections.map((section, sIdx) => (
                  <div
                    key={`left-sec-${sIdx}`}
                    className={`break-inside-avoid-column ${
                      mobileTab === 'left' ? 'mb-4 space-y-0.5' : isFittedScreen ? 'space-y-0.5' : 'space-y-1'
                    }`}
                  >
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
                        isCompactSpacing={isFittedScreen}
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
                <div
                  className={`flex-1 ${
                    mobileTab === 'right'
                      ? 'columns-1 md:columns-2 gap-8 [column-fill:_balance]'
                      : isFittedScreen
                      ? 'space-y-2'
                      : 'space-y-4'
                  }`}
                >
                  {rightSong.sections.map((section, sIdx) => (
                    <div
                      key={`right-sec-${sIdx}`}
                      className={`break-inside-avoid-column ${
                        mobileTab === 'right' ? 'mb-4 space-y-0.5' : isFittedScreen ? 'space-y-0.5' : 'space-y-1'
                      }`}
                    >
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
                          isCompactSpacing={isFittedScreen}
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
