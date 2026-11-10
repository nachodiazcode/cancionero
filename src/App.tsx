import React, { useState, useEffect, useMemo } from 'react';
import { Song, NotationSystem, ThemeMode } from './types/song';
import { DEFAULT_SONGS } from './data/defaultSongs';
import { CancioneroNavbar } from './components/CancioneroNavbar';
import { BookSpreadView } from './components/BookSpreadView';
import { SongPage } from './components/SongPage';
import { AutoScrollControls } from './components/AutoScrollControls';
import { ChordModal } from './components/ChordModal';
import { OriginalFacsimileModal } from './components/OriginalFacsimileModal';
import { SongEditorModal } from './components/SongEditorModal';
import { ChordGalleryModal } from './components/ChordGalleryModal';
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

  // Active view: 'both-page-19' shows the exact book spread from the photo
  const [activeSongId, setActiveSongId] = useState<string>('both-page-19');

  // Display and music settings
  const [notationSystem, setNotationSystem] = useState<NotationSystem>('latin');
  const [theme, setTheme] = useState<ThemeMode>('vintage');
  const [transpose, setTranspose] = useState<number>(0);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1.0);
  const [showChords, setShowChords] = useState<boolean>(true);
  const [isFittedScreen, setIsFittedScreen] = useState<boolean>(false);

  // Modals
  const [activeChordForModal, setActiveChordForModal] = useState<string | null>(null);
  const [isFacsimileModalOpen, setIsFacsimileModalOpen] = useState<boolean>(false);
  const [isNewSongModalOpen, setIsNewSongModalOpen] = useState<boolean>(false);
  const [isChordGalleryOpen, setIsChordGalleryOpen] = useState<boolean>(false);

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
    if (activeSongId === 'both-page-19') {
      return Array.from(new Set([...leftSong.chords, ...rightSong.chords]));
    }
    return singleSong.chords;
  }, [activeSongId, leftSong, rightSong, singleSong]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === 'stage'
          ? 'bg-gray-950 text-gray-100'
          : theme === 'vintage'
          ? 'bg-[#ede2ce] text-[#1c1815]'
          : 'bg-stone-50 text-gray-900'
      } ${isFittedScreen ? 'max-h-screen overflow-hidden' : ''}`}
    >
      {/* Top Navbar */}
      <CancioneroNavbar
        songs={songs}
        activeSongId={activeSongId}
        onSelectSong={(id) => {
          setActiveSongId(id);
          resetToTop();
        }}
        notationSystem={notationSystem}
        onNotationChange={setNotationSystem}
        theme={theme}
        onOpenOriginalScan={() => setIsFacsimileModalOpen(true)}
        onOpenNewSongModal={() => setIsNewSongModalOpen(true)}
        onOpenChordList={() => setIsChordGalleryOpen(true)}
        pageNumber={activeSongId === 'both-page-19' ? 19 : singleSong.pageNumber}
      />

      {/* Main Songbook Content Area */}
      <main
        className={`flex-1 transition-all ${
          isFittedScreen
            ? 'h-[calc(100vh-64px)] overflow-y-auto px-2 py-2'
            : 'px-2 sm:px-4 py-4 md:py-8'
        }`}
      >
        {activeSongId === 'both-page-19' ? (
          <BookSpreadView
            leftSong={leftSong}
            rightSong={rightSong}
            transposeSemitones={transpose}
            notationSystem={notationSystem}
            showChords={showChords}
            theme={theme}
            fontSizeMultiplier={isFittedScreen ? fontSizeMultiplier * 0.85 : fontSizeMultiplier}
            onChordClick={setActiveChordForModal}
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
          />
        )}
      </main>

      {/* Floating Auto-Scroll, Fit-to-screen & Transpose Controls */}
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
      />

      {/* Chord Fingering Modal */}
      <ChordModal
        chordName={activeChordForModal}
        onClose={() => setActiveChordForModal(null)}
        theme={theme}
      />

      {/* Original Facsimile Image Modal */}
      <OriginalFacsimileModal
        isOpen={isFacsimileModalOpen}
        onClose={() => setIsFacsimileModalOpen(false)}
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
    </div>
  );
};

export default App;
