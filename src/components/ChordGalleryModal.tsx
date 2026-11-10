import React from 'react';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { getChordDiagram } from '../data/chordDatabase';
import { X, Music } from 'lucide-react';
import { ThemeMode } from '../types/song';

interface ChordGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  chordNames: string[];
  songTitle: string;
  theme: ThemeMode;
  onSelectChord: (name: string) => void;
}

export const ChordGalleryModal: React.FC<ChordGalleryModalProps> = ({
  isOpen,
  onClose,
  chordNames,
  songTitle,
  theme,
  onSelectChord,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'stage';

  const diagrams = chordNames
    .map((name) => ({ name, diagram: getChordDiagram(name) }))
    .filter((item) => item.diagram !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border ${
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
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl">
                Diagramas de Acordes
              </h3>
              <p className="text-xs text-vintage-faded dark:text-gray-400">
                Para «{songTitle}»
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagrams Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {diagrams.map(({ name, diagram }) => (
              <div
                key={`gallery-${name}`}
                onClick={() => {
                  onSelectChord(name);
                  onClose();
                }}
                className="flex flex-col items-center p-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-amber-700 dark:hover:border-amber-400 cursor-pointer transition-all hover:scale-105"
              >
                <GuitarChordDiagram chord={diagram!} size="md" theme={theme} />
                <span className="mt-2 text-xs font-mono font-bold text-vintage-faded dark:text-gray-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
