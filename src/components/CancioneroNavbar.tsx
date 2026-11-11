import React from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import {
  BookOpen,
  PlusCircle,
  Music,
  Sparkles,
  Menu,
  Guitar,
} from 'lucide-react';

interface CancioneroNavbarProps {
  songs: Song[];
  activeSongId: string;
  onSelectSong: (id: string) => void;
  notationSystem?: NotationSystem;
  onNotationChange?: (notation: NotationSystem) => void;
  theme: ThemeMode;
  onOpenOriginalScan?: () => void;
  onOpenNewSongModal: () => void;
  onOpenChordList: () => void;
  onOpenTunerModal: () => void;
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
  onOpenNewSongModal,
  onOpenChordList,
  onOpenTunerModal,
  pageNumber,
  isCompactMode = false,
  isKaraokeMode = false,
  onToggleKaraokeMode,
  onToggleSidebar,
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
        className={`max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between gap-2 transition-all ${
          isCompactMode ? 'h-11' : 'h-14 sm:h-16'
        }`}
      >
        {/* Brand / Logo + Sidebar Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-vintage-faded hover:text-vintage-ink dark:text-gray-300 transition-colors"
              title="Mostrar / Ocultar menú lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

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

        {/* Song Selector */}
        <div className="flex-1 max-w-md mx-2">
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

        {/* Actions & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Afinador de Guitarra (Cifra Club Style) */}
          <button
            onClick={onOpenTunerModal}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#e60]/30 bg-[#e60]/10 hover:bg-[#e60]/20 text-[#e60] dark:text-[#ff8833] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
            title="Abrir Afinador de Guitarra online"
          >
            <Guitar className="w-3.5 h-3.5 text-[#e60]" />
            <span className="hidden xs:inline">Afinador</span>
          </button>

          {/* Modo Karaoke / Teleprompter Toggle */}
          {onToggleKaraokeMode && (
            <button
              onClick={onToggleKaraokeMode}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hidden md:flex items-center gap-1.5 shadow-xs ${
                isKaraokeMode
                  ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-400/40'
                  : 'border-amber-900/25 hover:bg-amber-800/10 text-vintage-ink dark:text-gray-200'
              }`}
              title={
                isKaraokeMode
                  ? 'Modo Teleprompter ACTIVO: enfoca la estrofa actual'
                  : 'Activar Modo Teleprompter: resalta la estrofa en curso para tocar sin perderte'
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKaraokeMode ? 'Karaoke ON' : 'Karaoke'}</span>
            </button>
          )}

          {/* Quick Chords of this song */}
          <button
            onClick={onOpenChordList}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors hidden sm:flex items-center gap-1 ${
              isDark
                ? 'border-gray-700 hover:bg-gray-800 text-gray-200'
                : 'border-amber-900/20 hover:bg-amber-800/10 text-vintage-ink'
            }`}
            title="Ver todos los acordes de la canción"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Acordes</span>
          </button>

          {/* Add Song */}
          <button
            onClick={onOpenNewSongModal}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-amber-800 dark:bg-amber-600 text-white hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
            title="Añadir una canción propia"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva</span>
          </button>
        </div>
      </div>
    </header>
  );
};
