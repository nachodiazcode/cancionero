import React, { useState, useEffect, useMemo } from 'react';
import { Song, NotationSystem, ThemeMode } from './types/song';
import { DEFAULT_SONGS } from './data/defaultSongs';
import { CancioneroNavbar } from './components/CancioneroNavbar';
import { HomePage } from './components/HomePage';
import { SpotifySidebar } from './components/SpotifySidebar';
import { ArtistDetailPage } from './components/ArtistDetailPage';
import { ARTISTS } from './data/artists';
import { BookSpreadView } from './components/BookSpreadView';
import { SongPage } from './components/SongPage';
import { AutoScrollControls } from './components/AutoScrollControls';
import { ChordModal } from './components/ChordModal';
import { SongEditorModal } from './components/SongEditorModal';
import { ChordGalleryModal } from './components/ChordGalleryModal';
import { GuitarTunerModal } from './components/GuitarTunerModal';
import { useAutoScroll } from './hooks/useAutoScroll';
import { useWakeLock } from './hooks/useWakeLock';

export const App: React.FC = () => {
  // Load saved songs or default songs from localStorage
  const [songs, setSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('cancionero_custom_songs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...DEFAULT_SONGS, ...parsed];
        }
      }
    } catch (e) {
      console.warn('Error loading songs from localStorage:', e);
    }
    return DEFAULT_SONGS;
  });

  // Active view: 'home' shows the library index, 'both-page-19' shows the book spread
  const [activeSongId, setActiveSongId] = useState<string>('home');

  // Display and music settings
  const [notationSystem] = useState<NotationSystem>('latin');
  const [theme, setTheme] = useState<ThemeMode>('vintage');
  const [transpose, setTranspose] = useState<number>(0);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1.0);
  const [showChords, setShowChords] = useState<boolean>(true);
  const [isFittedScreen, setIsFittedScreen] = useState<boolean>(false);
  const [isKaraokeMode, setIsKaraokeMode] = useState<boolean>(false);
  const [isCompactMode, setIsCompactMode] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });

  // Auto-detect window resize for compact mode (useful when user splits screen next to Capzule or Fresco!)
  useEffect(() => {
    const handleResize = () => {
      const isNarrow = window.innerWidth < 768;
      setIsCompactMode(isNarrow);
      if (!isNarrow) {
        setIsSidebarOpenMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals
  const [activeChordForModal, setActiveChordForModal] = useState<string | null>(null);
  const [isNewSongModalOpen, setIsNewSongModalOpen] = useState<boolean>(false);
  const [isChordGalleryOpen, setIsChordGalleryOpen] = useState<boolean>(false);
  const [isTunerModalOpen, setIsTunerModalOpen] = useState<boolean>(false);

  // Sidebar state (Spotify style)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  });
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);

  // Wake lock keeps the display on while practicing!
  const { isLocked: isWakeLocked } = useWakeLock(true);

  // Auto-scroll hook
  const {
    isPlaying,
    speed,
    scrollProgress,
    setSpeed,
    togglePlay,
    resetToTop,
  } = useAutoScroll({ initialSpeed: 2 });

  // Update theme on HTML body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'stage') {
      root.classList.add('dark');
      document.body.className = 'bg-gray-950 text-gray-100 selection:bg-amber-500 selection:text-gray-950 min-h-screen';
    } else if (theme === 'paper-clean') {
      root.classList.remove('dark');
      document.body.className = 'bg-white text-gray-900 selection:bg-gray-300 min-h-screen';
    } else {
      // Vintage
      root.classList.remove('dark');
      document.body.className = 'bg-[#ede2ce] text-[#1c1815] selection:bg-[#4a4036] selection:text-[#fdfbf7] min-h-screen';
    }
  }, [theme]);

  // Handle new custom song save
  const handleSaveSong = (newSong: Song) => {
    setSongs((prev) => {
      const updated = [...prev, newSong];
      const customOnly = updated.filter((s) => s.id.startsWith('custom-'));
      localStorage.setItem('cancionero_custom_songs', JSON.stringify(customOnly));
      return updated;
    });
    setActiveSongId(newSong.id);
  };

  // Artist routing state
  const currentArtist = useMemo(() => {
    if (activeSongId.startsWith('artist-')) {
      const aId = activeSongId.replace('artist-', '');
      return ARTISTS.find((a) => a.id === aId) || null;
    }
    return null;
  }, [activeSongId]);

  const currentArtistSongs = useMemo(() => {
    if (!currentArtist) return [];
    return songs.filter((s) =>
      s.artist.toLowerCase().includes(currentArtist.name.toLowerCase().split(' ')[0])
    );
  }, [currentArtist, songs]);

  // Identify active song(s)
  const leftSong = useMemo(
    () => songs.find((s) => s.id === 'sueno-con-serpientes') || songs[0],
    [songs]
  );
  const rightSong = useMemo(
    () => songs.find((s) => s.id === 'playa-giron') || songs[1],
    [songs]
  );
  const singleSong = useMemo(
    () => songs.find((s) => s.id === activeSongId) || songs[0],
    [songs, activeSongId]
  );

  // Chord list for the gallery
  const activeChordsForGallery = useMemo(() => {
    if (activeSongId === 'home' || activeSongId.startsWith('artist-')) {
      const set = new Set<string>();
      songs.forEach((s) => s.chords.forEach((c) => set.add(c)));
      return Array.from(set);
    }
    if (activeSongId === 'both-page-19') {
      return Array.from(new Set([...leftSong.chords, ...rightSong.chords]));
    }
    return singleSong.chords;
  }, [activeSongId, songs, leftSong, rightSong, singleSong]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === 'stage'
          ? 'bg-gray-950 text-gray-100'
          : theme === 'vintage'
          ? 'bg-[#ede2ce] text-[#1c1815]'
          : 'bg-stone-50 text-gray-900'
      } ${isFittedScreen && activeSongId !== 'home' && !activeSongId.startsWith('artist-') ? 'max-h-screen overflow-hidden' : ''}`}
    >
      {/* Top Navbar */}
      <CancioneroNavbar
        songs={songs}
        activeSongId={activeSongId}
        onSelectSong={(id) => {
          setActiveSongId(id);
          resetToTop();
        }}
        theme={theme}
        onOpenNewSongModal={() => setIsNewSongModalOpen(true)}
        onOpenChordList={() => setIsChordGalleryOpen(true)}
        onOpenTunerModal={() => setIsTunerModalOpen(true)}
        pageNumber={activeSongId === 'both-page-19' ? 19 : singleSong.pageNumber}
        isCompactMode={isCompactMode}
        isKaraokeMode={isKaraokeMode}
        onToggleKaraokeMode={() => setIsKaraokeMode((prev) => !prev)}
        onToggleSidebar={() => setIsSidebarOpenMobile((prev) => !prev)}
      />

      {/* App Shell Body: Sidebar + Main Content (Spotify Layout) */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Left Spotify Sidebar (Desktop + Drawer for mobile) */}
        <div
          className={`${
            isCompactMode && !isSidebarOpenMobile ? 'hidden' : 'flex'
          } ${
            isCompactMode && isSidebarOpenMobile
              ? 'fixed inset-y-0 left-0 z-50 shadow-2xl'
              : 'relative'
          }`}
        >
          <SpotifySidebar
            songs={songs}
            activeSongId={activeSongId}
            onSelectSong={(id) => {
              setActiveSongId(id);
              setIsSidebarOpenMobile(false);
              resetToTop();
            }}
            onOpenNewSong={() => {
              setIsNewSongModalOpen(true);
              setIsSidebarOpenMobile(false);
            }}
            onOpenChordGallery={() => {
              setIsChordGalleryOpen(true);
              setIsSidebarOpenMobile(false);
            }}
            onOpenTuner={() => {
              setIsTunerModalOpen(true);
              setIsSidebarOpenMobile(false);
            }}
            theme={theme}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
            selectedArtistFilter={currentArtist ? currentArtist.name : null}
            onSelectArtistFilter={(artistName) => {
              if (artistName) {
                const found = ARTISTS.find((a) =>
                  a.name.toLowerCase().includes(artistName.toLowerCase().split(' ')[0])
                );
                if (found) {
                  setActiveSongId(`artist-${found.id}`);
                }
              } else {
                setActiveSongId('home');
              }
              setIsSidebarOpenMobile(false);
              resetToTop();
            }}
          />
        </div>

        {/* Backdrop for mobile drawer */}
        {isCompactMode && isSidebarOpenMobile && (
          <div
            onClick={() => setIsSidebarOpenMobile(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
          />
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all overflow-y-auto ${
            isFittedScreen && activeSongId !== 'home' && !activeSongId.startsWith('artist-')
              ? 'h-[calc(100vh-64px)] px-2 py-2'
              : 'px-2 sm:px-6 py-4 md:py-8'
          }`}
        >
          {activeSongId === 'home' ? (
            <HomePage
              songs={songs}
              onSelectSong={(id) => {
                setActiveSongId(id);
                resetToTop();
              }}
              onNavigateToArtist={(artistId) => {
                setActiveSongId(`artist-${artistId}`);
                resetToTop();
              }}
              onOpenNewSong={() => setIsNewSongModalOpen(true)}
              onOpenChordGallery={() => setIsChordGalleryOpen(true)}
              onOpenTuner={() => setIsTunerModalOpen(true)}
              theme={theme}
            />
          ) : currentArtist ? (
            <ArtistDetailPage
              artist={currentArtist}
              songs={currentArtistSongs}
              onSelectSong={(id) => {
                setActiveSongId(id);
                resetToTop();
              }}
              onBackToHome={() => {
                setActiveSongId('home');
                resetToTop();
              }}
              onChordClick={setActiveChordForModal}
              theme={theme}
            />
          ) : activeSongId === 'both-page-19' ? (
            <BookSpreadView
              leftSong={leftSong}
              rightSong={rightSong}
              transposeSemitones={transpose}
              notationSystem={notationSystem}
              showChords={showChords}
              theme={theme}
              fontSizeMultiplier={isFittedScreen ? fontSizeMultiplier * 0.85 : fontSizeMultiplier}
              onChordClick={setActiveChordForModal}
              isFittedScreen={isFittedScreen}
            />
          ) : (
            <SongPage
              song={singleSong}
              transposeSemitones={transpose}
              notationSystem={notationSystem}
              showChords={showChords}
              theme={theme}
              fontSizeMultiplier={isFittedScreen ? fontSizeMultiplier * 0.85 : fontSizeMultiplier}
              onChordClick={setActiveChordForModal}
              isKaraokeMode={isKaraokeMode}
              isCompactMode={isCompactMode}
              isPlaying={isPlaying}
              speed={speed}
              isFittedScreen={isFittedScreen}
            />
          )}
        </main>
      </div>

      {/* Floating Auto-Scroll Controls (Only rendered when viewing an actual song) */}
      {activeSongId !== 'home' && !activeSongId.startsWith('artist-') && (
        <AutoScrollControls
          isPlaying={isPlaying}
          speed={speed}
          scrollProgress={scrollProgress}
          onTogglePlay={togglePlay}
          onSpeedChange={setSpeed}
          onReset={resetToTop}
          fontSizeMultiplier={fontSizeMultiplier}
          onFontSizeChange={setFontSizeMultiplier}
          transpose={transpose}
          onTransposeChange={setTranspose}
          showChords={showChords}
          onToggleChords={() => setShowChords((prev) => !prev)}
          theme={theme}
          onThemeChange={setTheme}
          isWakeLocked={isWakeLocked}
          isFittedScreen={isFittedScreen}
          onToggleFitScreen={() => setIsFittedScreen((prev) => !prev)}
          isKaraokeMode={isKaraokeMode}
          onToggleKaraokeMode={() => setIsKaraokeMode((prev) => !prev)}
          isCompactMode={isCompactMode}
          onToggleCompactMode={() => setIsCompactMode((prev) => !prev)}
        />
      )}

      {/* Chord Fingering Modal */}
      <ChordModal
        chordName={activeChordForModal}
        onClose={() => setActiveChordForModal(null)}
        theme={theme}
      />

      {/* Custom Song Editor Modal */}
      <SongEditorModal
        isOpen={isNewSongModalOpen}
        onClose={() => setIsNewSongModalOpen(false)}
        onSaveSong={handleSaveSong}
        theme={theme}
      />

      {/* Chord Gallery Modal */}
      <ChordGalleryModal
        isOpen={isChordGalleryOpen}
        onClose={() => setIsChordGalleryOpen(false)}
        chordNames={activeChordsForGallery}
        songTitle={
          activeSongId === 'both-page-19'
            ? 'Página 19 (Sueño con serpientes + Playa Girón)'
            : singleSong.title
        }
        theme={theme}
        onSelectChord={setActiveChordForModal}
      />

      {/* Guitar Tuner Modal (Cifra Club / LaCuerda Style) */}
      <GuitarTunerModal
        isOpen={isTunerModalOpen}
        onClose={() => setIsTunerModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};

export default App;
