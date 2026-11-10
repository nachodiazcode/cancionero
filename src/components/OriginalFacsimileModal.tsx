import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface OriginalFacsimileModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'vintage' | 'stage' | 'paper-clean';
}

export const OriginalFacsimileModal: React.FC<OriginalFacsimileModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'stage';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-gray-950 border-gray-800 text-gray-100'
            : 'bg-[#f7f2e7] border-amber-900/30 text-vintage-ink'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl">
              Facsímil Original — Página 19
            </h3>
            <p className="text-xs text-vintage-faded dark:text-gray-400">
              «Sueño con serpientes» y «Playa Girón» de Silvio Rodríguez
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Image & Comparison Details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="relative group rounded-xl overflow-hidden border border-black/15 shadow-inner bg-amber-950/10 flex justify-center">
            <img
              src="/cancionero-original.jpg"
              alt="Página 19 original del cancionero"
              className="max-h-[65vh] w-auto object-contain rounded shadow-lg"
            />
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-white/5 border border-amber-900/15 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold font-serif text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Características adaptadas al Cancionero Digital Responsive:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-vintage-faded dark:text-gray-300 ml-2">
              <li><strong>Acordes precisos sobre cada sílaba:</strong> Anclaje responsivo que nunca se desalinea en pantallas chicas.</li>
              <li><strong>Diagramas de trastes originales:</strong> Digitaciones exactas de SOL*, RE4 y DO9 reproducidas en SVG interactivo.</li>
              <li><strong>Auto-scroll Manos Libres:</strong> Toca tu guitarra sin tener que interrumpir la canción para scrollear.</li>
              <li><strong>Pantalla siempre encendida (Wake Lock):</strong> Evita que tu celular o tablet se apague mientras practicas.</li>
              <li><strong>Transportador tonal instantáneo:</strong> Sube o baja semitonos con 1 clic en notación Latina (DO RE MI) o Anglosajona.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
