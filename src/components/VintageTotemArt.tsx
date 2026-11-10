import React from 'react';

interface VintageTotemArtProps {
  className?: string;
  theme?: 'vintage' | 'stage' | 'paper-clean';
}

export const VintageTotemArt: React.FC<VintageTotemArtProps> = ({
  className = '',
  theme = 'vintage',
}) => {
  const isDark = theme === 'stage';
  const inkColor = isDark ? '#d1d5db' : '#1c1815';

  return (
    <div className={`flex flex-col items-center justify-between select-none ${className}`}>
      <svg
        viewBox="0 0 160 620"
        className="w-full h-auto max-h-[720px] drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Serpent Tail curling upward with arrow tip */}
        <path
          d="M 80 50 Q 82 20 72 8 L 84 2 L 80 16 Q 95 35 78 70 Q 60 110 74 150 Q 88 190 76 220"
          stroke={inkColor}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Tail arrowhead */}
        <polygon
          points="84,2 70,8 78,16"
          fill={inkColor}
        />

        {/* Small dragon claws / fins on body */}
        <path
          d="M 68 180 L 45 170 L 42 178 L 52 184 L 40 190 L 58 198 L 70 195"
          stroke={inkColor}
          strokeWidth="2"
          fill={inkColor}
        />
        <path
          d="M 84 175 L 115 165 L 118 174 L 105 180 L 116 186 L 98 194 L 86 190"
          stroke={inkColor}
          strokeWidth="2"
          fill={inkColor}
        />

        {/* Scaled body with pen-and-ink hatching */}
        <path
          d="M 72 215 Q 60 250 68 300 Q 75 330 72 370 L 88 370 Q 85 330 92 300 Q 100 250 88 215 Z"
          fill={isDark ? '#374151' : '#ede2ce'}
          stroke={inkColor}
          strokeWidth="2.5"
        />

        {/* Body scales pattern */}
        <g stroke={inkColor} strokeWidth="1.2" opacity="0.85">
          <path d="M 69 230 Q 80 240 91 230" />
          <path d="M 67 245 Q 80 255 93 245" />
          <path d="M 66 260 Q 80 270 94 260" />
          <path d="M 68 275 Q 80 285 92 275" />
          <path d="M 70 290 Q 80 300 90 290" />
          <path d="M 71 305 Q 80 315 89 305" />
          <path d="M 70 320 Q 80 330 90 320" />
          <path d="M 72 335 Q 80 345 88 335" />
          <path d="M 72 350 Q 80 360 88 350" />
        </g>

        {/* Dragon Head with gaping jaws, fangs and long tongue */}
        <g transform="translate(10, 290)">
          {/* Dragon Horns / Crest */}
          <path
            d="M 45 40 Q 40 10 32 0 Q 38 15 48 25 Q 52 10 50 2 Q 54 18 60 28"
            stroke={inkColor}
            strokeWidth="2"
            fill={inkColor}
          />
          {/* Upper snout & eye */}
          <path
            d="M 60 28 Q 45 35 25 38 Q 15 40 8 45 Q 2 50 6 58 Q 15 60 30 52 Q 45 48 55 55"
            stroke={inkColor}
            strokeWidth="2.5"
            fill="none"
          />
          {/* Eye */}
          <circle cx="35" cy="42" r="5" stroke={inkColor} strokeWidth="2" fill="none" />
          <circle cx="36" cy="42" r="2.5" fill={inkColor} />

          {/* Sharp Upper Fangs */}
          <polygon points="12,50 16,58 18,50" fill={inkColor} />
          <polygon points="22,50 25,60 28,50" fill={inkColor} />
          <polygon points="32,49 35,57 38,49" fill={inkColor} />

          {/* Long curled snake tongue protruding downwards */}
          <path
            d="M 22 55 C 10 70 8 95 18 110 C 22 116 20 125 15 130 C 10 135 5 125 8 115 C 3 100 2 75 16 58 Z"
            fill={inkColor}
            stroke={inkColor}
            strokeWidth="1.5"
          />

          {/* Lower Jaw with fangs */}
          <path
            d="M 5 68 Q 15 72 35 68 Q 48 65 52 75"
            stroke={inkColor}
            strokeWidth="2.5"
            fill="none"
          />
          <polygon points="12,68 15,62 18,68" fill={inkColor} />
          <polygon points="24,68 27,60 30,68" fill={inkColor} />

          {/* Dragon wing / fin */}
          <path
            d="M 65 55 Q 95 65 110 50 Q 100 70 115 80 Q 95 85 85 105 Q 75 90 65 85 Z"
            stroke={inkColor}
            strokeWidth="2"
            fill={inkColor}
          />
        </g>

        {/* Totem base with Aztec/Mayan Skull Icon */}
        <g transform="translate(30, 440)">
          {/* Totem Rectangular Block */}
          <rect
            x="5"
            y="0"
            width="90"
            height="90"
            rx="4"
            fill={inkColor}
          />

          {/* Stylized Skull Eyes and Nose in inverted color */}
          {/* Top beads */}
          <circle cx="28" cy="12" r="4" fill={isDark ? '#111827' : '#ede2ce'} />
          <circle cx="42" cy="12" r="4" fill={isDark ? '#111827' : '#ede2ce'} />
          <circle cx="58" cy="12" r="4" fill={isDark ? '#111827' : '#ede2ce'} />
          <circle cx="72" cy="12" r="4" fill={isDark ? '#111827' : '#ede2ce'} />

          {/* Big Cartoonish Skull Eyes */}
          <circle cx="34" cy="38" r="14" fill={isDark ? '#111827' : '#ede2ce'} />
          <circle cx="66" cy="38" r="14" fill={isDark ? '#111827' : '#ede2ce'} />

          {/* Pupils */}
          <circle cx="34" cy="38" r="6" fill={inkColor} />
          <circle cx="66" cy="38" r="6" fill={inkColor} />

          {/* Triangular nose */}
          <polygon
            points="50,48 44,58 56,58"
            fill={isDark ? '#111827' : '#ede2ce'}
          />

          {/* Skull Teeth Grid */}
          <g fill={isDark ? '#111827' : '#ede2ce'}>
            <rect x="30" y="66" width="6" height="14" rx="2" />
            <rect x="40" y="66" width="6" height="14" rx="2" />
            <rect x="50" y="66" width="6" height="14" rx="2" />
            <rect x="60" y="66" width="6" height="14" rx="2" />
          </g>
        </g>

        {/* Bottom vertical support stripes */}
        <g fill={inkColor}>
          <rect x="45" y="370" width="8" height="70" />
          <rect x="60" y="370" width="8" height="70" />
          <rect x="75" y="370" width="8" height="70" />
          <rect x="90" y="370" width="8" height="70" />

          {/* Stripes below skull totem down to ground */}
          <rect x="45" y="530" width="8" height="85" />
          <rect x="60" y="530" width="8" height="85" />
          <rect x="75" y="530" width="8" height="85" />
          <rect x="90" y="530" width="8" height="85" />
        </g>
      </svg>
    </div>
  );
};
