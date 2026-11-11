import React, { useState } from 'react';
import { Song, ThemeMode } from '../types/song';
import { ARTISTS } from '../data/artists';
import {
  Home,
  Library,
  Plus,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Guitar,
  Maximize2,
} from 'lucide-react';

interface SpotifySidebarProps {
  songs: Song[];
  activeSongId: string;
  onSelectSong: (id: string) => void;
  onOpenNewSong: () => void;
  onOpenChordGallery: () => void;
  onOpenTuner: () => void;
  theme: ThemeMode;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  selectedArtistFilter: string | null;
  onSelectArtistFilter: (artistName: string | null) => void;
  isFittedScreen?: boolean;
  onToggleFitScreen?: () => void;
}

export const SpotifySidebar: React.FC<SpotifySidebarProps> = ({
  songs,
  activeSongId,
  onSelectSong,
  onOpenNewSong,
  onOpenChordGallery,
  onOpenTuner,
  theme,
  isCollapsed,
  onToggleCollapsed,
  selectedArtistFilter,
  onSelectArtistFilter,
  isFittedScreen = false,
  onToggleFitScreen,
}) => {
  const [libraryTab, setLibraryTab] = useState<'all' | 'artists' | 'songs'>('all');
  const isDark = theme === 'stage';

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 shrink-0 z-20 border-r ${
        isDark
          ? 'bg-gray-950/95 border-gray-800 text-gray-200'
          : theme === 'vintage'
          ? 'bg-[#f4ede0] border-amber-900/15 text-vintage-ink'
          : 'bg-stone-100 border-gray-200 text-gray-900'
      } ${isCollapsed ? 'w-16' : 'w-64 sm:w-72'}`}
    >
      {/* ================= TOP SECTION: LOGO & PRIMARY NAV ================= */}
      <div className="p-3 space-y-2">
        {/* Brand / Logo + Collapse Toggle */}
        <div className="flex items-center justify-between px-2 py-1.5">
          {!isCollapsed && (
            <button
              onClick={() => {
                onSelectSong('home');
                onSelectArtistFilter(null);
              }}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Ir al Inicio"
            >
              <span className="font-serif italic font-bold text-2xl tracking-tight text-vintage-ink dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                cancionero
              </span>
            </button>
          )}

          <button
            onClick={onToggleCollapsed}
            className={`p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-vintage-faded dark:text-gray-400 ${
              isCollapsed ? 'mx-auto' : ''
            }`}
            title={isCollapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items (Spotify Style) */}
        <nav className="space-y-0.5">
          {/* 1. Inicio */}
          <button
            onClick={() => {
              onSelectSong('home');
              onSelectArtistFilter(null);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeSongId === 'home' && !selectedArtistFilter
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title="Inicio"
          >
            <Home className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Inicio</span>}
          </button>

          {/* 2. Afinador Online (Cifra Club Style) */}
          <button
            onClick={onOpenTuner}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-vintage-faded hover:text-vintage-ink dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title="Afinador de Guitarra online"
          >
            <Guitar className="w-5 h-5 shrink-0 text-[#e60]" />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>Afinador</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#e60]/15 text-[#e60] font-bold">
                  440Hz
                </span>
              </div>
            )}
          </button>

          {/* 3. Modo Atril (Zero Scroll) */}
          {onToggleFitScreen && (
            <button
              onClick={onToggleFitScreen}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isFittedScreen
                  ? 'bg-amber-700/20 text-amber-900 dark:text-amber-300 border border-amber-900/30'
                  : 'text-vintage-faded hover:text-vintage-ink dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Modo Atril: Canción completa en 2 columnas sin scroll"
            >
              <Maximize2 className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>Modo Atril</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-900 dark:text-amber-200">
                    {isFittedScreen ? 'ON' : 'OFF'}
                  </span>
                </div>
              )}
            </button>
          )}
        </nav>
      </div>

      {/* ================= SECOND SECTION: "TU BIBLIOTECA" ================= */}
      <div className="flex-1 flex flex-col min-h-0 px-2 py-2 border-t border-amber-900/10 dark:border-gray-800">
        {/* Header of Tu Biblioteca */}
        <div className="flex items-center justify-between px-2 py-1.5 text-xs">
          <div className="flex items-center gap-2 font-bold font-serif text-vintage-ink dark:text-gray-200">
            <Library className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            {!isCollapsed && <span>Tu Repertorio</span>}
          </div>

          {!isCollapsed && (
            <button
              onClick={onOpenNewSong}
              className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-vintage-faded hover:text-vintage-ink dark:text-gray-300 transition-colors"
              title="Añadir nueva canción"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips (Spotify style) */}
        {!isCollapsed && (
          <div className="flex items-center gap-1 px-2 py-1 text-[11px] overflow-x-auto">
            <button
              onClick={() => setLibraryTab('all')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                libraryTab === 'all'
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'bg-black/5 dark:bg-white/5 text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setLibraryTab('artists')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                libraryTab === 'artists'
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'bg-black/5 dark:bg-white/5 text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
              }`}
            >
              Artistas
            </button>
            <button
              onClick={() => setLibraryTab('songs')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                libraryTab === 'songs'
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'bg-black/5 dark:bg-white/5 text-vintage-faded hover:text-vintage-ink dark:text-gray-300'
              }`}
            >
              Canciones
            </button>
          </div>
        )}

        {/* Scrollable Library List */}
        <div className="flex-1 overflow-y-auto space-y-1 py-1 pr-1 custom-scrollbar">
          {/* ARTISTS (Circular Avatars) */}
          {(libraryTab === 'all' || libraryTab === 'artists') && (
            <div className="space-y-0.5">
              {!isCollapsed && libraryTab === 'all' && (
                <div className="text-[10px] uppercase font-mono tracking-wider text-vintage-faded/70 dark:text-gray-500 font-bold px-2.5 py-1">
                  Artistas
                </div>
              )}
              {ARTISTS.map((artist) => {
                const isSelected = selectedArtistFilter === artist.name;
                const artistSongCount = songs.filter((s) =>
                  s.artist.toLowerCase().includes(artist.name.toLowerCase().split(' ')[0])
                ).length;

                return (
                  <button
                    key={artist.id}
                    onClick={() => {
                      onSelectSong('home');
                      onSelectArtistFilter(isSelected ? null : artist.name);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all text-left ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-950 dark:text-amber-200 border border-amber-900/25'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-vintage-ink dark:text-gray-200'
                    } ${isCollapsed ? 'justify-center px-1' : ''}`}
                    title={`${artist.name} (${artistSongCount} canciones)`}
                  >
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-black/15 dark:border-white/20 shadow-xs"
                    />
                    {!isCollapsed && (
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-bold text-xs truncate">
                          {artist.name}
                        </div>
                        <div className="text-[10px] text-vintage-faded dark:text-gray-400 truncate">
                          Artista · {artistSongCount} {artistSongCount === 1 ? 'canción' : 'canciones'}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* SONGS (Square Thumbnails) */}
          {(libraryTab === 'all' || libraryTab === 'songs') && (
            <div className="space-y-0.5 pt-1">
              {!isCollapsed && libraryTab === 'all' && (
                <div className="text-[10px] uppercase font-mono tracking-wider text-vintage-faded/70 dark:text-gray-500 font-bold px-2.5 py-1">
                  Canciones
                </div>
              )}
              {songs.map((song) => {
                const isPlayingThis = activeSongId === song.id;

                return (
                  <button
                    key={`lib-song-${song.id}`}
                    onClick={() => {
                      onSelectSong(song.id);
                      onSelectArtistFilter(null);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all text-left ${
                      isPlayingThis
                        ? 'bg-amber-800 text-white shadow-xs'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-vintage-ink dark:text-gray-200'
                    } ${isCollapsed ? 'justify-center px-1' : ''}`}
                    title={`${song.title} — ${song.artist}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border font-serif font-bold text-xs ${
                        isPlayingThis
                          ? 'bg-amber-900 border-amber-700 text-amber-200'
                          : 'bg-amber-500/10 border-amber-900/15 text-amber-900 dark:text-amber-300'
                      }`}
                    >
                      <Disc3 className={`w-4 h-4 ${isPlayingThis ? 'animate-spin' : ''}`} />
                    </div>

                    {!isCollapsed && (
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-semibold text-xs truncate">
                          {song.title}
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isPlayingThis ? 'text-amber-200' : 'text-vintage-faded dark:text-gray-400'
                          }`}
                        >
                          {song.artist} · {song.originalKey}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM SHORTCUTS / TOOLS ================= */}
      {!isCollapsed && (
        <div className="p-3 border-t border-amber-900/15 dark:border-gray-800 space-y-1 text-xs">
          <button
            onClick={onOpenTuner}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-vintage-faded hover:text-vintage-ink dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Guitar className="w-3.5 h-3.5 text-[#e60]" />
              <span>Afinador de Guitarra</span>
            </span>
            <span className="text-[10px] font-mono text-[#e60] font-bold">440Hz</span>
          </button>

          <button
            onClick={onOpenChordGallery}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-vintage-faded hover:text-vintage-ink dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Disc3 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Galería de Acordes</span>
          </button>
        </div>
      )}
    </aside>
  );
};
