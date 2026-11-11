import React, { useMemo } from 'react';
import { Song, ThemeMode } from '../types/song';
import { ARTISTS } from '../data/artists';
import {
  Play,
  Guitar,
  PlusCircle,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface HomePageProps {
  songs: Song[];
  onSelectSong: (id: string) => void;
  onNavigateToArtist: (artistId: string) => void;
  onOpenNewSong: () => void;
  onOpenChordGallery: () => void;
  onOpenTuner: () => void;
  onOpenFacsimile?: () => void;
  theme: ThemeMode;
}

export const HomePage: React.FC<HomePageProps> = ({
  songs,
  onSelectSong,
  onNavigateToArtist,
  onOpenNewSong,
  onOpenChordGallery,
  onOpenTuner,
  onOpenFacsimile,
  theme,
}) => {
  const isDark = theme === 'stage';

  // Dynamic greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Buenos días';
    if (hour >= 12 && hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  // Top 5 Quick-Access items (Individual songs, clean without 'Página 19 (Libro)')
  const quickAccessItems = useMemo(() => {
    return [
      {
        id: 'nada-nuevo-bajo-el-sol',
        title: 'Nada nuevo bajo el sol',
        artist: 'Los Bunkers · Hermanos Durán',
        imageUrl: '/artists/los-bunkers.jpg',
        badge: 'Tono: F#m',
      },
      {
        id: 'te-recuerdo-amanda',
        title: 'Te recuerdo Amanda',
        artist: 'Víctor Jara',
        imageUrl: '/artists/victor-jara.jpg',
        badge: 'Intro Tab · Tono G',
      },
      {
        id: 'ojala',
        title: 'Ojalá',
        artist: 'Silvio Rodríguez',
        imageUrl: '/artists/silvio-rodriguez.jpg',
        badge: 'Tono: SOL',
      },
      {
        id: 'sueno-con-serpientes',
        title: 'Sueño con serpientes',
        artist: 'Silvio Rodríguez',
        imageUrl: '/artists/silvio-rodriguez.jpg',
        badge: 'pág. 19 · SOL',
      },
      {
        id: 'playa-giron',
        title: 'Playa Girón',
        artist: 'Silvio Rodríguez',
        imageUrl: '/artists/silvio-rodriguez.jpg',
        badge: 'pág. 19 · Intro Tab',
      },
    ];
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-10">
      {/* ================= GREETING HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-amber-900/15 dark:border-gray-800 pb-3">
        <div>
          <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-800 dark:text-amber-400">
            Cancionero de Guitarra
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-vintage-ink dark:text-gray-50 tracking-tight">
            {greeting}, a tocar guitarra
          </h1>
        </div>

        <span className="text-xs font-mono text-vintage-faded dark:text-gray-400">
          {songs.length} canciones · {ARTISTS.length} artistas
        </span>
      </div>

      {/* ================= SPOTIFY BENTO GRID (6 QUICK CARDS FROM USER SCREENSHOT) ================= */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-vintage-faded dark:text-gray-400 font-bold">
          Acceso Rápido
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickAccessItems.map((item) => (
            <div
              key={`bento-${item.id}`}
              onClick={() => onSelectSong(item.id)}
              className={`group relative flex items-center gap-3.5 p-2 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                isDark
                  ? 'bg-gray-900/80 border-gray-800 hover:bg-gray-800/90 text-gray-100'
                  : 'bg-[#faf5eb] border-amber-900/15 hover:bg-[#f6efe1] text-vintage-ink'
              }`}
            >
              {/* Thumbnail Image */}
              <img
                src={item.imageUrl}
                alt={item.artist}
                className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm border border-black/10 dark:border-white/10"
              />

              {/* Text Info */}
              <div className="min-w-0 flex-1 pr-12">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-amber-800 dark:text-amber-400 block truncate">
                  {item.badge}
                </span>
                <h3 className="font-serif font-bold text-sm truncate leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-vintage-faded dark:text-gray-400 truncate font-serif italic">
                  {item.artist}
                </p>
              </div>

              {/* Spotify Floating Amber Play Button */}
              <div className="absolute right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSong(item.id === 'both-page-19' ? 'both-page-19' : item.id);
                  }}
                  className="w-10 h-10 rounded-full bg-amber-700 hover:bg-amber-600 text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  title="Abrir canción"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SPOTIFY ARTISTS SECTION (ROUND AVATARS NAVIGATE TO ARTIST DETAIL PAGE) ================= */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-vintage-ink dark:text-gray-50 tracking-tight">
            Artistas del Cancionero
          </h2>
          <p className="text-xs text-vintage-faded dark:text-gray-400 font-serif">
            Haz clic en un artista para abrir su repertorio completo y acordes
          </p>
        </div>

        {/* Circular Spotify Artist Cards - Clicking navigates to Artist Detail Page */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {ARTISTS.map((artist) => {
            const artistSongs = songs.filter((s) =>
              s.artist.toLowerCase().includes(artist.name.toLowerCase().split(' ')[0])
            );

            return (
              <div
                key={`home-artist-${artist.id}`}
                onClick={() => onNavigateToArtist(artist.id)}
                className={`group p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center hover:shadow-lg ${
                  isDark
                    ? 'bg-gray-900/70 border-gray-800 hover:bg-gray-850 hover:border-gray-700 text-gray-100'
                    : 'bg-[#faf6ee] border-amber-900/15 hover:bg-[#f6efe1] hover:border-amber-800/40 text-vintage-ink'
                }`}
              >
                {/* Circular Photo with Hover Animation & Floating Play Button */}
                <div className="relative mb-3.5">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-md border-2 border-amber-900/15 dark:border-white/20 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute right-1 bottom-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    <div className="w-11 h-11 rounded-full bg-amber-700 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Artist Info */}
                <h3 className="font-serif font-bold text-xl leading-snug group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                  {artist.name}
                </h3>
                <span className="text-xs text-vintage-faded dark:text-gray-400 font-serif italic mt-0.5">
                  {artist.genre}
                </span>

                <div className="mt-3 pt-2.5 border-t border-amber-900/10 dark:border-gray-800 w-full flex items-center justify-between text-xs font-mono text-vintage-faded dark:text-gray-400">
                  <span className="text-amber-800 dark:text-amber-400 font-bold">
                    {artistSongs.length} {artistSongs.length === 1 ? 'canción' : 'canciones'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold group-hover:text-vintage-ink transition-colors">
                    <span>Ver canciones</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECCIÓN: ARTISTAS MÁS INFLUYENTES 2026 (LACUERDA & CIFRA CLUB) ================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#e60]">
                Ranking Hispanoamericano
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold">
                Abril 2026
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-vintage-ink dark:text-gray-50 tracking-tight">
              Artistas Más Influyentes & Canciones Populares
            </h2>
          </div>
          <p className="text-xs text-vintage-faded dark:text-gray-400 font-serif max-w-sm">
            Los acordes y canciones más buscados en <strong>LaCuerda.net</strong> y <strong>Cifra Club</strong>.
          </p>
        </div>

        {/* Grid de Canciones Populares con 1-click import */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: 'Crimen',
              artist: 'Gustavo Cerati',
              ranking: '#95 LaCuerda',
              tone: 'Tono: F#m',
              desc: 'Acordes de rock argentino con melodía en guitarra y piano',
            },
            {
              title: 'Tu falta de querer',
              artist: 'Mon Laferte',
              ranking: '#5 LaCuerda',
              tone: 'Tono: Bm',
              desc: 'Balada acústica con punteo emotivo y rasgueo',
            },
            {
              title: 'Flaca',
              artist: 'Andrés Calamaro',
              ranking: '#7 LaCuerda',
              tone: 'Tono: G',
              desc: 'Clásico del cancionero acústico con acordes G - B7 - Em - C',
            },
            {
              title: 'De música ligera',
              artist: 'Soda Stereo',
              ranking: '#28 LaCuerda',
              tone: 'Tono: Bm',
              desc: 'Secuencia icónica Bm - G - D - A en guitarra',
            },
          ].map((item, idx) => (
            <div
              key={`popular-${idx}`}
              onClick={onOpenNewSong}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md ${
                isDark
                  ? 'bg-gray-900/60 border-gray-800 hover:border-amber-500/40'
                  : 'bg-[#faf6ee] border-amber-900/15 hover:border-[#e60]/50 shadow-xs'
              }`}
              title="Haz clic para agregar esta canción a tu cancionero"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#e60]/10 text-[#e60]">
                  {item.ranking}
                </span>
                <span className="text-[10px] font-mono text-vintage-faded dark:text-gray-400">
                  {item.tone}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-vintage-ink dark:text-gray-100 group-hover:text-[#e60] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-vintage-faded dark:text-gray-300 font-serif italic mb-2">
                {item.artist}
              </p>
              <p className="text-[11px] text-vintage-faded/80 dark:text-gray-400 leading-snug">
                {item.desc}
              </p>
              <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-[#e60]">
                <span>+ Agregar a mi lista</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRACTICE TOOLS / MUSICAL FOOTER ================= */}
      <section className="pt-2 border-t border-amber-900/15 dark:border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Afinador Button */}
          <div
            onClick={onOpenTuner}
            className={`p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-xs flex items-center gap-3 ${
              isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-[#faf6ee] border-amber-900/15 hover:border-[#e60]/50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#e60]/15 text-[#e60] flex items-center justify-center shrink-0">
              <Guitar className="w-5 h-5 text-[#e60]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif font-bold text-sm">Afinador de Guitarra</h4>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#e60]/20 text-[#e60] font-bold">
                  440Hz
                </span>
              </div>
              <p className="text-[11px] text-vintage-faded dark:text-gray-400">
                Afinación de oído o por micrófono en vivo
              </p>
            </div>
          </div>

          {/* Galería de Acordes */}
          <div
            onClick={onOpenChordGallery}
            className={`p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-xs flex items-center gap-3 ${
              isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-[#faf6ee] border-amber-900/15'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Guitar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm">Galería de Acordes</h4>
              <p className="text-[11px] text-vintage-faded dark:text-gray-400">
                Diagramas de mástil con notas y posiciones
              </p>
            </div>
          </div>

          {/* Agregar Nueva Canción */}
          <div
            onClick={onOpenNewSong}
            className={`p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-xs flex items-center gap-3 ${
              isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-[#faf6ee] border-amber-900/15'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm">Importar Canción</h4>
              <p className="text-[11px] text-vintage-faded dark:text-gray-400">
                Pega acordes desde LaCuerda o Cifra Club
              </p>
            </div>
          </div>

          {/* Facsímil Original */}
          {onOpenFacsimile && (
            <div
              onClick={onOpenFacsimile}
              className={`p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-xs flex items-center gap-3 ${
                isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-[#faf6ee] border-amber-900/15'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-800/15 text-amber-900 dark:text-amber-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">Facsímil Histórico</h4>
                <p className="text-[11px] text-vintage-faded dark:text-gray-400">
                  Ver escaneo original del cancionero físico
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
