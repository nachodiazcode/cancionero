import React from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import { BookOpen } from 'lucide-react';

interface CancioneroNavbarProps {
  songs: Song[];
  activeSongId: string;
  onSelectSong: (id: string) => void;
  notationSystem?: NotationSystem;
  onNotationChange?: (notation: NotationSystem) => void;
  theme: ThemeMode;
  onOpenOriginalScan?: () => void;
  onOpenNewSongModal?: () => void;
  onOpenChordList?: () => void;
  onOpenTunerModal?: () => void;
  pageNumber?: number;
  isCompactMode?: boolean;
  isFittedScreen?: boolean;
  onToggleFitScreen?: () => void;
  isKaraokeMode?: boolean;
  onToggleKaraokeMode?: () => void;
  onToggleSidebar?: () => void;
}

export const CancioneroNavbar: React.FC<CancioneroNavbarProps> = ({
  songs,
  activeSongId,
  onSelectSong,
  theme,
  pageNumber,
  isCompactMode = false,
}) => {
  const isDark = theme === 'stage';

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-gray-900/90 border-gray-800 text-gray-100'
          : theme === 'vintage'
          ? 'bg-[#ede2ce]/90 border-amber-900/20 text-vintage-ink shadow-sm'
          : 'bg-white/90 border-gray-200 text-gray-900 shadow-sm'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-3 transition-all ${
          isCompactMode ? 'h-11' : 'h-14 sm:h-16'
        }`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => onSelectSong('home')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            title="Ir al Inicio / Biblioteca de Canciones"
          >
            <div className="flex items-baseline gap-1">
              <span
                className={`font-serif italic tracking-tight text-vintage-ink dark:text-amber-100 font-bold group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors ${
                  isCompactMode ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'
                }`}
              >
                cancionero
              </span>
              {pageNumber && !isCompactMode && activeSongId !== 'home' && (
                <span className="font-mono text-xs text-vintage-faded dark:text-gray-400 font-semibold">
                  p.{pageNumber}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Buscador / Selector de Canciones */}
        <div className="flex-1 max-w-md sm:max-w-lg">
          <div className="relative">
            <select
              value={activeSongId}
              onChange={(e) => onSelectSong(e.target.value)}
              className={`w-full py-1.5 pl-3 pr-8 rounded-lg text-sm font-serif font-semibold border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-700/30 transition-all ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-100'
                  : theme === 'vintage'
                  ? 'bg-paper-100 border-amber-900/30 text-vintage-ink'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
            >
              <option value="home">🏠 Inicio / Biblioteca de Canciones</option>
              {songs.map((song) => (
                <option key={song.id} value={song.id}>
                  {song.title} — {song.artist}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-vintage-faded dark:text-gray-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
