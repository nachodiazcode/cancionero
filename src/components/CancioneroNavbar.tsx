import React from 'react';
import { Song, NotationSystem, ThemeMode } from '../types/song';
import {
  BookOpen,
  Image,
  PlusCircle,
  Music,
  Languages,
} from 'lucide-react';

interface CancioneroNavbarProps {
  songs: Song[];
  activeSongId: string;
  onSelectSong: (id: string) => void;
  notationSystem: NotationSystem;
  onNotationChange: (notation: NotationSystem) => void;
  theme: ThemeMode;
  onOpenOriginalScan: () => void;
  onOpenNewSongModal: () => void;
  onOpenChordList: () => void;
  pageNumber?: number;
}

export const CancioneroNavbar: React.FC<CancioneroNavbarProps> = ({
  songs,
  activeSongId,
  onSelectSong,
  notationSystem,
  onNotationChange,
  theme,
  onOpenOriginalScan,
  onOpenNewSongModal,
  onOpenChordList,
  pageNumber,
}) => {
  const isDark = theme === 'stage';

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-gray-900/90 border-gray-800 text-gray-100'
          : theme === 'vintage'
          ? 'bg-[#ede2ce]/90 border-amber-900/20 text-vintage-ink shadow-sm'
          : 'bg-white/90 border-gray-200 text-gray-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif italic text-2xl sm:text-3xl tracking-tight text-vintage-ink dark:text-amber-100 font-bold">
              cancionero
            </span>
            {pageNumber && (
              <span className="font-mono text-xs text-vintage-faded dark:text-gray-400 font-semibold">
                p.{pageNumber}
              </span>
            )}
          </div>
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
              <option value="both-page-19">📖 Página 19: Sueño con serpientes + Playa Girón (Libro)</option>
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
          {/* Notation toggle: DO-RE-MI vs C-D-E */}
          <button
            onClick={() => onNotationChange(notationSystem === 'latin' ? 'anglo' : 'latin')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors flex items-center gap-1 ${
              isDark
                ? 'border-gray-700 hover:bg-gray-800'
                : 'border-amber-900/20 hover:bg-amber-800/10'
            }`}
            title="Cambiar sistema de notación: Latino (DO RE MI) o Anglosajón (C D E)"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{notationSystem === 'latin' ? 'DO RE MI' : 'C D E'}</span>
          </button>

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

          {/* View Original Facsimile Scan from photo */}
          <button
            onClick={onOpenOriginalScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-900/30 bg-amber-500/10 dark:bg-amber-400/10 hover:bg-amber-500/20 transition-all text-amber-950 dark:text-amber-200"
            title="Ver imagen original del cancionero físico"
          >
            <Image className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ver Facsímil</span>
          </button>

          {/* Add Song */}
          <button
            onClick={onOpenNewSongModal}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-amber-800 dark:bg-amber-600 text-white hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
            title="Añadir una canción propia"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Canción</span>
          </button>
        </div>
      </div>
    </header>
  );
};
