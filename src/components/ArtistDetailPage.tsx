import React from 'react';
import { Song, ThemeMode } from '../types/song';
import { Artist } from '../data/artists';
import {
  ArrowLeft,
  Play,
  Music,
  BookOpen,
  Guitar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ArtistDetailPageProps {
  artist: Artist;
  songs: Song[];
  onSelectSong: (songId: string) => void;
  onBackToHome: () => void;
  onChordClick: (chord: string) => void;
  theme: ThemeMode;
}

export const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({
  artist,
  songs,
  onSelectSong,
  onBackToHome,
  onChordClick,
  theme,
}) => {
  const isDark = theme === 'stage';

  // Get all unique chords for this artist
  const artistChords = Array.from(
    new Set(songs.flatMap((s) => s.chords))
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-8 animate-fade-in">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-900/20 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all text-vintage-ink dark:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <span className="text-xs font-mono text-vintage-faded dark:text-gray-400">
          Perfil de Artista
        </span>
      </div>

      {/* ================= SPOTIFY ARTIST HERO HEADER ================= */}
      <section
        className={`relative overflow-hidden rounded-3xl border transition-all ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-gray-800 text-gray-100 shadow-2xl'
            : theme === 'vintage'
            ? 'bg-gradient-to-br from-[#f6eee0] via-[#f4ead7] to-[#ece1cc] border-amber-900/20 text-vintage-ink shadow-book-deep'
            : 'bg-gradient-to-br from-white via-stone-50 to-amber-50/40 border-gray-200 text-gray-900 shadow-xl'
        } p-6 sm:p-10`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
          {/* Circular Large Artist Portrait with Vinyl Shadow */}
          <div className="relative shrink-0">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover shadow-2xl border-4 border-amber-900/20 dark:border-white/20"
            />
            <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-amber-700 text-white shadow-md">
              <Guitar className="w-4 h-4" />
            </div>
          </div>

          {/* Artist Metadata */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-900/20 text-amber-900 dark:text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Artista del Cancionero</span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
              {artist.name}
            </h1>

            <p className="font-serif italic text-sm sm:text-base text-vintage-faded dark:text-gray-300 max-w-xl">
              {artist.genre} · {artist.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-vintage-faded dark:text-gray-400">
              <span>
                <strong className="text-amber-800 dark:text-amber-300 font-bold">{songs.length}</strong> {songs.length === 1 ? 'canción' : 'canciones'}
              </span>
              <span>·</span>
              <span>
                <strong className="text-amber-800 dark:text-amber-300 font-bold">{artistChords.length}</strong> acordes registrados
              </span>
            </div>
          </div>

          {/* Play First Song CTA */}
          {songs.length > 0 && (
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => onSelectSong(songs[0].id)}
                className="w-14 h-14 rounded-full bg-amber-700 hover:bg-amber-600 active:scale-95 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all"
                title={`Tocar ${songs[0].title}`}
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= SPOTIFY SONG LIST / TRACKLIST ================= */}
      <section className="space-y-4">
        <div className="border-b border-amber-900/15 dark:border-gray-800 pb-3">
          <h2 className="font-serif font-bold text-2xl tracking-tight text-vintage-ink dark:text-gray-100 flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <span>Canciones de {artist.name}</span>
          </h2>
          <p className="text-xs text-vintage-faded dark:text-gray-400 font-serif">
            Haz clic en cualquier canción para abrirla y ver sus acordes en tiempo real.
          </p>
        </div>

        {/* Special Double Page 19 Card for Silvio Rodríguez */}
        {artist.id === 'silvio-rodriguez' && (
          <div
            onClick={() => onSelectSong('both-page-19')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md flex items-center justify-between gap-4 ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-400'
                : 'bg-[#faf6ee] border-amber-900/25 hover:border-amber-800/60 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-sm">
                📖
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                  Edición Facsímil Página 19
                </span>
                <h3 className="font-serif font-bold text-lg text-vintage-ink dark:text-gray-100 truncate group-hover:text-amber-800 dark:group-hover:text-amber-300">
                  sueño con serpientes + playa girón (Libro Completo)
                </h3>
                <p className="text-xs text-vintage-faded dark:text-gray-400 truncate font-serif italic">
                  Las dos páginas enfrentadas con epígrafe de Bertolt Brecht y tablatura original.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSong('both-page-19');
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver Libro</span>
            </button>
          </div>
        )}

        {/* Tracklist Rows (Spotify Style Table) */}
        <div className="space-y-2">
          {songs.map((song, idx) => (
            <div
              key={`artist-track-${song.id}`}
              onClick={() => onSelectSong(song.id)}
              className={`group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                isDark
                  ? 'bg-gray-900/70 border-gray-800 hover:bg-gray-800/80 text-gray-100'
                  : 'bg-[#faf6ee] border-amber-900/15 hover:bg-[#f5ecdd] text-vintage-ink'
              }`}
            >
              {/* Left: #, Title & Info */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <span className="w-6 text-center font-mono text-sm font-bold text-vintage-faded group-hover:text-amber-800 dark:group-hover:text-amber-400">
                  {idx + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-snug group-hover:text-amber-800 dark:group-hover:text-amber-300 truncate">
                      {song.title}
                    </h3>
                    <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-900/10 shrink-0">
                      {song.originalKey}
                    </span>
                  </div>

                  {song.subtitle && (
                    <p className="text-xs text-vintage-faded dark:text-gray-400 font-serif italic truncate mt-0.5">
                      {song.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Center: Chord Pills (Hidden on small mobile) */}
              <div className="hidden sm:flex items-center gap-1">
                {song.chords.slice(0, 5).map((chord) => (
                  <span
                    key={`track-${song.id}-${chord}`}
                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 border border-amber-900/10"
                  >
                    {chord}
                  </span>
                ))}
                {song.chords.length > 5 && (
                  <span className="font-mono text-[10px] text-vintage-faded dark:text-gray-400 px-1">
                    +{song.chords.length - 5}
                  </span>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSong(song.id);
                  }}
                  className="p-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white shadow-xs transition-colors"
                  title="Abrir canción"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CHORD VOCABULARY FOR THIS ARTIST ================= */}
      {artistChords.length > 0 && (
        <section className="p-5 rounded-2xl border border-amber-900/15 dark:border-gray-800 bg-[#faf6ee] dark:bg-gray-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-vintage-ink dark:text-gray-200 flex items-center gap-2">
              <Guitar className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Acordes utilizados por {artist.name}</span>
            </h3>
            <span className="text-xs text-vintage-faded font-mono">
              Haz clic para ver la digitación
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {artistChords.map((chord) => (
              <button
                key={`artist-chord-${chord}`}
                onClick={() => onChordClick(chord)}
                className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 border border-amber-900/20 shadow-2xs hover:scale-105 active:scale-95 transition-all"
                title={`Ver digitación de ${chord}`}
              >
                {chord}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
