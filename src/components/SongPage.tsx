import React, { useState, useEffect, useRef } from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { SongLineRenderer } from './SongLineRenderer';
import { SectionMarker } from './SectionMarker';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { getChordDiagram } from '../data/chordDatabase';
import { Columns, Square, Sparkles, ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';

interface SongPageProps {
  song: Song;
  transposeSemitones: number;
  notationSystem: NotationSystem;
  showChords: boolean;
  theme: ThemeMode;
  fontSizeMultiplier: number;
  onChordClick: (chord: string) => void;
  showMarginDiagrams?: boolean;
  isKaraokeMode?: boolean;
  isCompactMode?: boolean;
  isPlaying?: boolean;
  speed?: number;
  isFittedScreen?: boolean;
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
  isKaraokeMode = false,
  isCompactMode = false,
  isPlaying = false,
  speed = 2,
  isFittedScreen = false,
}) => {
  // Allow toggling 1, 2, or 3 columns for a single song to fit everything on screen!
  const [columnsCount, setColumnsCount] = useState<1 | 2 | 3>(() => (isFittedScreen ? 2 : 1));
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [showFullEpigraph, setShowFullEpigraph] = useState<boolean>(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isFittedScreen) {
      setColumnsCount(2);
    }
  }, [isFittedScreen]);

  // Reset active section when song changes
  useEffect(() => {
    setActiveSectionIndex(0);
  }, [song.id]);

  // In Karaoke mode: Auto-advance sections when isPlaying is true
  useEffect(() => {
    if (!isKaraokeMode || !isPlaying) return;

    const currentSection = song.sections[activeSectionIndex];
    const linesCount = currentSection ? Math.max(2, currentSection.lines.length) : 4;
    // Base time: ~3.8 seconds per line, scaled inversely by speed (speed 2 = normal)
    const delayMs = Math.max(3000, (linesCount * 3800) / (speed / 2));

    const timer = setTimeout(() => {
      setActiveSectionIndex((prev) => {
        if (prev < song.sections.length - 1) {
          const nextIdx = prev + 1;
          sectionRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return nextIdx;
        }
        return prev;
      });
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isKaraokeMode, isPlaying, activeSectionIndex, song.sections, speed]);

  // Keyboard navigation for sections in Karaoke mode
  useEffect(() => {
    if (!isKaraokeMode) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setActiveSectionIndex((prev) => {
          const nextIdx = Math.min(song.sections.length - 1, prev + 1);
          sectionRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return nextIdx;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setActiveSectionIndex((prev) => {
          const prevIdx = Math.max(0, prev - 1);
          sectionRefs.current[prevIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return prevIdx;
        });
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isKaraokeMode, song.sections.length]);

  const jumpToSection = (idx: number) => {
    setActiveSectionIndex(idx);
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Get unique diagrams for this song
  const chordDiagrams = song.chords
    .map((name) => getChordDiagram(name))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div
      className={`relative w-full mx-auto transition-all ${
        isFittedScreen
          ? 'max-w-7xl px-2 sm:px-4 py-1 pb-24'
          : isCompactMode
          ? 'max-w-2xl px-2 sm:px-4 py-2 pb-44'
          : 'max-w-5xl px-3 sm:px-8 py-6 pb-40'
      }`}
    >
      <div
        className={`rounded-2xl transition-all border ${
          isFittedScreen
            ? 'p-3 sm:p-6 shadow-md'
            : isCompactMode
            ? 'p-3 sm:p-6 shadow-md'
            : 'p-6 sm:p-10 shadow-book-deep'
        } ${
          theme === 'stage'
            ? 'bg-gray-900/95 border-gray-800 text-gray-100 shadow-2xl'
            : theme === 'vintage'
            ? 'bg-[#f8f4ea] border-amber-900/15 text-vintage-ink'
            : 'bg-white border-gray-200 text-gray-900 shadow-xl'
        }`}
      >
        {/* Song Header */}
        <header
          className={`border-b border-amber-900/15 dark:border-gray-800 flex flex-wrap items-baseline justify-between gap-2 ${
            isCompactMode ? 'mb-3 pb-2' : 'mb-6 pb-4'
          }`}
        >
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-vintage-faded/70 dark:text-gray-400 font-semibold block mb-0.5">
              {song.artist}
            </span>
            <h1
              className="font-serif lowercase font-bold tracking-tight text-2xl sm:text-4xl text-vintage-ink dark:text-gray-50 leading-tight"
              style={{ fontSize: `${(isCompactMode ? 24 : 32) * fontSizeMultiplier}px` }}
            >
              {song.title}
            </h1>
            {song.subtitle && !isCompactMode && (
              <p className="font-serif italic text-vintage-faded dark:text-gray-400 text-sm mt-0.5">
                {song.subtitle}
              </p>
            )}
          </div>

          {/* Quick Header Actions: Columns & Karaoke Status */}
          <div className="flex items-center gap-1.5 text-xs">
            {isKaraokeMode && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-300 font-semibold text-xs border border-amber-900/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-600 dark:text-amber-400" />
                <span>
                  Estrofa {activeSectionIndex + 1}/{song.sections.length}
                </span>
                <button
                  type="button"
                  onClick={() => jumpToSection(Math.max(0, activeSectionIndex - 1))}
                  disabled={activeSectionIndex === 0}
                  className="p-0.5 hover:bg-black/10 rounded disabled:opacity-30 ml-1"
                  title="Estrofa anterior (Flecha Arriba)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => jumpToSection(Math.min(song.sections.length - 1, activeSectionIndex + 1))}
                  disabled={activeSectionIndex >= song.sections.length - 1}
                  className="p-0.5 hover:bg-black/10 rounded disabled:opacity-30"
                  title="Siguiente estrofa (Flecha Abajo o Espacio)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {!isCompactMode && (
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
                  <span>2 Col</span>
                </button>
                <button
                  onClick={() => setColumnsCount(3)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${
                    columnsCount === 3
                      ? 'bg-amber-800 text-white font-semibold shadow-xs'
                      : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
                  }`}
                  title="Dividir en 3 columnas (pantalla ancha)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>3 Col</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Epigraph / Quote (e.g. Bertolt Brecht) */}
        {song.epigraph && (
          <div
            onClick={() => setShowFullEpigraph((prev) => !prev)}
            className={`rounded-xl bg-amber-500/5 dark:bg-white/5 border-l-2 border-amber-800/40 dark:border-amber-400/40 italic font-book text-vintage-faded dark:text-gray-300 cursor-pointer transition-all ${
              isFittedScreen || !showFullEpigraph
                ? 'p-2 text-xs flex items-center justify-between gap-2 mb-3'
                : 'p-3 text-xs sm:text-sm mb-5'
            }`}
            title="Clic para ver/ocultar epígrafe completo"
          >
            {isFittedScreen || !showFullEpigraph ? (
              <>
                <p className="truncate">
                  “{song.epigraph.quote.split('\n')[0]}…”
                </p>
                <span className="font-serif not-italic font-bold text-[10px] text-vintage-ink dark:text-gray-300 whitespace-nowrap">
                  — {song.epigraph.author} ▾
                </span>
              </>
            ) : (
              <>
                <p
                  className="whitespace-pre-line leading-relaxed"
                  style={{ fontSize: `${13.5 * fontSizeMultiplier}px` }}
                >
                  {song.epigraph.quote}
                </p>
                <p className="mt-1.5 text-xs font-serif not-italic font-bold text-vintage-ink dark:text-gray-300">
                  — {song.epigraph.author} ▴
                </p>
              </>
            )}
          </div>
        )}

        {/* Intro Progression */}
        {song.intro && (
          <div
            className={`rounded-xl bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 dark:border-gray-800 font-mono text-xs sm:text-sm max-w-xl ${
              isFittedScreen ? 'p-2 mb-3' : 'p-3 mb-5'
            }`}
            style={{ fontSize: `${(isFittedScreen ? 12.5 : 14) * fontSizeMultiplier}px` }}
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
          {/* Main Lyrics Area (Optionally 2 or 3 columns on tablet/desktop) */}
          <div
            className={
              showMarginDiagrams && chordDiagrams.length > 0 && columnsCount === 1 && !isFittedScreen
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
            }
          >
            <div
              className={`space-y-4 ${
                columnsCount === 3
                  ? 'lg:columns-3 md:columns-2 gap-6 lg:gap-8 [column-fill:_balance]'
                  : columnsCount === 2
                  ? 'md:columns-2 gap-8 lg:gap-12 [column-fill:_balance]'
                  : ''
              }`}
            >
              {song.sections.map((section, sIdx) => {
                const isActive = isKaraokeMode && activeSectionIndex === sIdx;
                const isInactive = isKaraokeMode && activeSectionIndex !== sIdx;

                return (
                  <div
                    key={`section-${sIdx}`}
                    ref={(el) => {
                      sectionRefs.current[sIdx] = el;
                    }}
                    onClick={() => {
                      if (isKaraokeMode) jumpToSection(sIdx);
                    }}
                    className={`break-inside-avoid-column space-y-1 transition-all duration-300 ${
                      isFittedScreen || isCompactMode ? 'mb-2.5' : 'mb-5'
                    } ${
                      isActive
                        ? 'p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 ring-2 ring-amber-600/50 dark:ring-amber-400/50 shadow-md scale-[1.01]'
                        : isInactive
                        ? 'opacity-35 hover:opacity-75 cursor-pointer filter'
                        : ''
                    }`}
                  >
                    {/* Section Marker */}
                    {section.marker && (
                      <div className="flex items-center justify-between mb-0.5">
                        <SectionMarker marker={section.marker} theme={theme} />
                        {isActive && (
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-700 dark:text-amber-300 animate-pulse bg-amber-500/20 px-2 py-0.5 rounded-full">
                            Tocando ahora ✦
                          </span>
                        )}
                      </div>
                    )}

                    {/* Lines */}
                    <div className="space-y-0.5">
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
                          isCompactSpacing={isFittedScreen || isCompactMode}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Margin Chord Diagrams (Shown only when in 1 single column mode) */}
          {showMarginDiagrams && chordDiagrams.length > 0 && showChords && columnsCount === 1 && !isFittedScreen && (
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

        {/* Chord Diagrams bottom strip for 2/3 column or Atril mode */}
        {showChords && chordDiagrams.length > 0 && (columnsCount > 1 || isFittedScreen) && (
          <div className="mt-4 pt-2.5 border-t border-amber-900/10 dark:border-gray-800">
            <span className="text-[10px] font-mono uppercase tracking-widest text-vintage-faded dark:text-gray-400 font-bold block mb-1.5">
              Acordes utilizados:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {chordDiagrams.map((chord) => (
                <button
                  key={`bottom-diag-${chord.name}`}
                  onClick={() => onChordClick(chord.name)}
                  className="cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  title={`Ver digitación de ${chord.name}`}
                >
                  <GuitarChordDiagram chord={chord} size="sm" theme={theme} />
                </button>
              ))}
            </div>
          </div>
        )}

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
