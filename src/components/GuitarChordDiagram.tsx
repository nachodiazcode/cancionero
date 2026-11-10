import React from 'react';
import { GuitarChord } from '../types/song';

interface GuitarChordDiagramProps {
  chord: GuitarChord;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'vintage' | 'stage' | 'paper-clean';
  showTitle?: boolean;
}

export const GuitarChordDiagram: React.FC<GuitarChordDiagramProps> = ({
  chord,
  size = 'md',
  theme = 'vintage',
  showTitle = true,
}) => {
  const { name, frets, baseFret = 1, barres = [] } = chord;

  // Diagram geometry
  const width = size === 'sm' ? 70 : size === 'lg' ? 120 : 92;
  const height = size === 'sm' ? 95 : size === 'lg' ? 155 : 122;
  
  const numStrings = 6;
  const numFrets = 4; // Standard 4 visible frets
  
  const marginX = size === 'sm' ? 12 : size === 'lg' ? 18 : 15;
  const marginTop = size === 'sm' ? 24 : size === 'lg' ? 34 : 28;
  const marginBottom = size === 'sm' ? 10 : size === 'lg' ? 16 : 14;
  
  const boardWidth = width - marginX * 2;
  const boardHeight = height - marginTop - marginBottom;
  
  const stringSpacing = boardWidth / (numStrings - 1);
  const fretSpacing = boardHeight / numFrets;

  // Colors based on theme
  const isDark = theme === 'stage';
  const strokeColor = isDark ? '#e5e7eb' : '#231912';
  const nutColor = isDark ? '#f3f4f6' : '#1c1815';
  const dotColor = isDark ? '#60a5fa' : '#1c1815';
  const textColor = isDark ? '#f3f4f6' : '#231912';
  const mutedColor = isDark ? '#9ca3af' : '#786857';

  return (
    <div className="inline-flex flex-col items-center select-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        aria-label={`Diagrama de acorde para ${name}`}
      >
        {/* Chord Name Header */}
        {showTitle && (
          <text
            x={width / 2}
            y={marginTop - 8}
            textAnchor="middle"
            fill={textColor}
            className="font-serif font-bold text-xs tracking-wider"
            fontSize={size === 'sm' ? '11px' : size === 'lg' ? '16px' : '13px'}
          >
            {name}
          </text>
        )}

        {/* Nut (Thick line if baseFret is 1, else fret indicator number on the side) */}
        {baseFret === 1 ? (
          <line
            x1={marginX - 1}
            y1={marginTop}
            x2={marginX + boardWidth + 1}
            y2={marginTop}
            stroke={nutColor}
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        ) : (
          <>
            <line
              x1={marginX}
              y1={marginTop}
              x2={marginX + boardWidth}
              y2={marginTop}
              stroke={strokeColor}
              strokeWidth={1}
            />
            <text
              x={marginX - 4}
              y={marginTop + fretSpacing * 0.7}
              textAnchor="end"
              fill={mutedColor}
              fontSize="9px"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {baseFret}fr
            </text>
          </>
        )}

        {/* Frets (horizontal lines) */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => {
          if (i === 0 && baseFret === 1) return null; // Already drawn nut
          const y = marginTop + i * fretSpacing;
          return (
            <line
              key={`fret-${i}`}
              x1={marginX}
              y1={y}
              x2={marginX + boardWidth}
              y2={y}
              stroke={strokeColor}
              strokeWidth={1}
              strokeOpacity={0.7}
            />
          );
        })}

        {/* Strings (vertical lines) */}
        {Array.from({ length: numStrings }).map((_, i) => {
          const x = marginX + i * stringSpacing;
          // Thicker lines for lower E / A strings
          const stringWeight = 0.7 + (5 - i) * 0.15;
          return (
            <line
              key={`string-${i}`}
              x1={x}
              y1={marginTop}
              x2={x}
              y2={marginTop + boardHeight}
              stroke={strokeColor}
              strokeWidth={stringWeight}
              strokeOpacity={0.8}
            />
          );
        })}

        {/* Barres (cejillas) */}
        {barres.map((barreFret) => {
          const fretIdx = barreFret - (baseFret - 1);
          if (fretIdx < 1 || fretIdx > numFrets) return null;
          const y = marginTop + (fretIdx - 0.5) * fretSpacing;
          return (
            <rect
              key={`barre-${barreFret}`}
              x={marginX}
              y={y - 4}
              width={boardWidth}
              height={8}
              rx={4}
              fill={dotColor}
              fillOpacity={0.85}
            />
          );
        })}

        {/* Open (O) / Muted (X) markers and Fret Dots */}
        {frets.map((fret, stringIdx) => {
          const x = marginX + stringIdx * stringSpacing;

          if (fret === -1) {
            // Muted string (X above nut)
            return (
              <text
                key={`mute-${stringIdx}`}
                x={x}
                y={marginTop - 3}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="10px"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                ×
              </text>
            );
          }

          if (fret === 0) {
            // Open string (O above nut)
            return (
              <circle
                key={`open-${stringIdx}`}
                cx={x}
                cy={marginTop - 5}
                r={2.5}
                fill="none"
                stroke={mutedColor}
                strokeWidth={1.2}
              />
            );
          }

          // Fretted note: dot on fretboard
          const fretOffset = fret - (baseFret - 1);
          if (fretOffset >= 1 && fretOffset <= numFrets) {
            const y = marginTop + (fretOffset - 0.5) * fretSpacing;
            const dotRadius = size === 'sm' ? 4 : size === 'lg' ? 6 : 5;
            return (
              <circle
                key={`dot-${stringIdx}`}
                cx={x}
                cy={y}
                r={dotRadius}
                fill={dotColor}
              />
            );
          }

          return null;
        })}
      </svg>
    </div>
  );
};
