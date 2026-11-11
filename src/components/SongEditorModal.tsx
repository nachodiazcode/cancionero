import React, { useState } from 'react';
import { Song, SongSection } from '../types/song';
import { parseChordProLine, convertTwoLineChordsToChordPro } from '../utils/chordTheory';
import { X, Save, Music, HelpCircle, Wand2 } from 'lucide-react';

interface SongEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSong: (song: Song) => void;
  theme: 'vintage' | 'stage' | 'paper-clean';
}

export const SongEditorModal: React.FC<SongEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveSong,
  theme,
}) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [key, setKey] = useState('SOL');
  const [intro, setIntro] = useState('');
  const [rawText, setRawText] = useState(`(A)
[SOL] Sueño con serpientes
[SOL] Con serpientes de mar
[rem] Con cierto mar ¡ay!
(V-0) [FA] [DO] [SOL] De serpientes sueño yo.

(B)
¡Oh!
[rem] [FA] [DO] [SOL] La mato y aparece una mayor`);

  if (!isOpen) return null;

  const isDark = theme === 'stage';

  const handleSave = () => {
    if (!title.trim()) {
      alert('Por favor ingresa un título para la canción');
      return;
    }

    // Auto-convert if pasted in LaCuerda / Cifra Club 2-line chord format
    const processedText = convertTwoLineChordsToChordPro(rawText);
    const lines = processedText.split('\n');
    const sections: SongSection[] = [];
    let currentSection: SongSection = { lines: [] };
    const discoveredChords = new Set<string>();

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();

      // Check for section marker like (A), (B), [Intro], etc.
      const markerMatch = trimmed.match(/^(\([A-Z0-9]+\)|\[[A-Za-z0-9\s]+\])$/);
      if (markerMatch) {
        if (currentSection.lines.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { marker: markerMatch[1], lines: [] };
        continue;
      }

      if (!trimmed) {
        currentSection.lines.push({ type: 'blank' });
        continue;
      }

      // Check for guitar tablature line (e.g. e|---, E|---, B|---)
      if (/^[eEaAdDgGbB1-6]\|/.test(trimmed)) {
        currentSection.lines.push({
          type: 'tab',
          tabText: rawLine,
        });
        continue;
      }

      // Parse chords inside brackets
      const tokens = parseChordProLine(rawLine);
      const hasAnyChord = tokens.some((t) => t.chord);

      if (hasAnyChord) {
        tokens.forEach((t) => {
          if (t.chord) discoveredChords.add(t.chord);
        });
        currentSection.lines.push({
          type: 'lyric-chord',
          tokens,
        });
      } else {
        currentSection.lines.push({
          type: 'lyric-only',
          text: rawLine,
        });
      }
    }

    if (currentSection.lines.length > 0) {
      sections.push(currentSection);
    }

    const newSong: Song = {
      id: `custom-${Date.now()}`,
      title: title.trim().toLowerCase(),
      artist: artist.trim() || 'Desconocido',
      originalKey: key.trim().toUpperCase() || 'SOL',
      intro: intro.trim() || undefined,
      sections,
      chords: Array.from(discoveredChords),
      pageNumber: Math.floor(Math.random() * 80) + 20,
    };

    onSaveSong(newSong);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border ${
          isDark
            ? 'bg-gray-950 border-gray-800 text-gray-100'
            : 'bg-[#f7f2e7] border-amber-900/30 text-vintage-ink shadow-book-deep'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-xl sm:text-2xl">
              Añadir Nueva Canción
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold mb-1">
                Título de la Canción *
              </label>
              <input
                type="text"
                placeholder="ej. Ojalá"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm font-serif bg-white/70 dark:bg-gray-800 border-amber-900/30 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
            <div>
              <label className="block text-xs font-serif font-bold mb-1">
                Autor / Artista
              </label>
              <input
                type="text"
                placeholder="ej. Silvio Rodríguez"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm font-serif bg-white/70 dark:bg-gray-800 border-amber-900/30 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold mb-1">
                Tonalidad original
              </label>
              <input
                type="text"
                placeholder="ej. SOL o G"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm font-mono bg-white/70 dark:bg-gray-800 border-amber-900/30 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
            <div>
              <label className="block text-xs font-serif font-bold mb-1">
                Introducción (Opcional)
              </label>
              <input
                type="text"
                placeholder="ej. SOL* - RE4 - DO9 - RE4"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm font-mono bg-white/70 dark:bg-gray-800 border-amber-900/30 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
          </div>

          {/* Format helper box */}
          <div className="p-3 rounded-lg bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 text-xs space-y-1">
            <div className="flex items-center gap-1 font-bold text-amber-900 dark:text-amber-300">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Formato de Acordes:</span>
            </div>
            <p className="text-vintage-faded dark:text-gray-300">
              Coloca los acordes entre corchetes justo antes de la sílaba donde se tocan:
            </p>
            <p className="font-mono bg-black/5 dark:bg-white/5 p-1.5 rounded text-[11px]">
              (A)<br />
              [SOL]Compañeros [RE]poetas<br />
              [DO]¿Qué tipo de [RE]adjetivos [SOL]se debe usar
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-serif font-bold">
                Letra con Acordes
              </label>
              <button
                type="button"
                onClick={() => setRawText((prev) => convertTwoLineChordsToChordPro(prev))}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#e60] hover:text-[#d50] hover:underline"
                title="Detecta acordes sobre la letra de LaCuerda o Cifra Club y los convierte automáticamente"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Auto-formatear desde LaCuerda / Cifra Club</span>
              </button>
            </div>
            <textarea
              rows={9}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Pega la letra con acordes aquí (formato LaCuerda o [Acorde]Letra)..."
              className="w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-mono bg-white/70 dark:bg-gray-800 border-amber-900/30 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/10 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-800 dark:bg-amber-600 text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Guardar en el Cancionero</span>
          </button>
        </div>
      </div>
    </div>
  );
};
