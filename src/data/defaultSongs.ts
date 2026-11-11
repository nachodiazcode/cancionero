import { Song } from '../types/song';

export const DEFAULT_SONGS: Song[] = [
  {
    id: 'sueno-con-serpientes',
    title: 'sueño con serpientes',
    subtitle: 'Canción testimonial',
    artist: 'Silvio Rodríguez',
    pageNumber: 19,
    originalKey: 'SOL',
    epigraph: {
      quote: `“Hay hombres que luchan un día\nY son buenos.\nHay otros que luchan un año\nY son mejores.\nHay quienes luchan muchos años\ny son muy buenos.\nPero hay los que luchan toda la vida:\nEsos son los imprescindibles”.`,
      author: 'Bertolt Brecht',
    },
    chords: ['SOL', 'rem', 'FA', 'DO', 'mim', 'RE', 'LA#'],
    sections: [
      {
        marker: '(A)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Sueño con serpientes' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Con serpientes de mar' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'rem', lyric: 'Con cierto mar ' },
              { lyric: '¡ay!' },
            ],
          },
          {
            type: 'lyric-chord',
            tabText: '(V-0)',
            tokens: [
              { lyric: '(V-0) ' },
              { chord: 'FA', lyric: 'De ' },
              { chord: 'DO', lyric: 'serpientes ' },
              { chord: 'SOL', lyric: 'sueño yo.' },
            ],
          },
        ],
      },
      {
        marker: '(A)',
        lines: [
          { type: 'lyric-only', text: 'Largas, transparentes' },
          { type: 'lyric-only', text: 'Y en sus barrigas llevan' },
          { type: 'lyric-only', text: 'Lo que puedan' },
          { type: 'lyric-only', text: 'Arrebatarle al amor.' },
          { type: 'chord-only', text: 'rem - FA - DO - SOL' },
        ],
      },
      {
        marker: '(B)',
        lines: [
          { type: 'lyric-only', text: '¡Oh!' },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'rem', lyric: 'La ' },
              { chord: 'FA', lyric: 'mato ' },
              { chord: 'DO', lyric: 'y aparece ' },
              { chord: 'SOL', lyric: 'una mayor' },
            ],
          },
          { type: 'chord-only', text: 'rem - FA - DO - SOL' },
          { type: 'lyric-only', text: '¡Oh!' },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'rem', lyric: 'Con mucho ' },
              { chord: 'FA', lyric: 'más infierno' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'En di' },
              { chord: 'SOL', lyric: 'gestión.' },
            ],
          },
        ],
      },
      {
        marker: '(A)',
        lines: [
          { type: 'lyric-only', text: 'No quepo en su boca' },
          { type: 'lyric-only', text: 'Me trata de tragar' },
          { type: 'lyric-only', text: 'Pero se atora' },
          { type: 'lyric-only', text: 'Con un trébol de mi sien' },
          { type: 'lyric-only', text: 'Creo que está loca' },
          { type: 'lyric-only', text: 'Le doy de masticar una paloma' },
          { type: 'lyric-only', text: 'Y la enveneno de mi bien.' },
        ],
      },
      {
        marker: '(B)',
        lines: [
          { type: 'lyric-only', text: '¡Oh!' },
          { type: 'lyric-only', text: 'La mato...' },
        ],
      },
      {
        marker: '(A)',
        lines: [
          { type: 'lyric-only', text: 'Esta al fin me engulle' },
          { type: 'lyric-only', text: 'Y mientras por su esófago paseo' },
          { type: 'lyric-only', text: 'Voy pensando en qué vendrá' },
          { type: 'lyric-only', text: 'Pero se destruye' },
          { type: 'lyric-only', text: 'Cuando llego a su estómago' },
          { type: 'lyric-only', text: 'Y planteo con un verso una verdad.' },
        ],
      },
      {
        marker: '(B)',
        lines: [
          { type: 'lyric-only', text: '¡Oh!' },
          { type: 'lyric-only', text: 'La mato...' },
          { type: 'chord-only', text: 'LA# - FA - mim      RE' },
        ],
      },
      {
        marker: '(C)',
        lines: [
          { type: 'lyric-only', text: 'La mato y aparece una mayor' },
          { type: 'chord-only', text: 'rem - FA - DO - SOL - rem - FA - DO - SOL' },
          { type: 'lyric-only', text: '¡Oh!' },
        ],
      },
    ],
  },
  {
    id: 'playa-giron',
    title: 'playa girón',
    subtitle: 'Canción dedicada a los pescadores',
    artist: 'Silvio Rodríguez',
    pageNumber: 19,
    originalKey: 'SOL',
    intro: 'SOL* - RE4 - DO9 - RE4 - SOL*',
    chords: ['SOL*', 'RE4', 'DO9', 'SOL', 'RE', 'mim', 'LA', 'LA7', 'DO', 'SI7', 'sim', 'lam', 'FA'],
    sections: [
      {
        marker: '(A)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Compañeros ' },
              { lyric: 'poetas' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { lyric: 'Tomando en cuenta los últimos ' },
              { chord: 'RE', lyric: 'sucesos' },
            ],
          },
          {
            type: 'lyric-only',
            text: 'En la poesía',
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'mim', lyric: 'Quisiera ' },
              { lyric: '(VI-0-2-3-V-0) ' },
              { chord: 'LA', lyric: 'preguntar ' },
              { lyric: '—me urge— ' },
              { chord: 'LA7', lyric: '' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: '¿Qué tipo de ' },
              { chord: 'RE', lyric: 'adjetivos' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Se debe usar para hacer' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'El poema ' },
              { chord: 'SI7', lyric: 'de un barco' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'mim', lyric: 'Sin que se haga ' },
              { chord: 'DO', lyric: 'sentimental' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'RE', lyric: 'Fuera de la vanguardia' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL*', lyric: 'O ' },
              { chord: 'SI7', lyric: 'evidente ' },
              { chord: 'mim', lyric: 'panfleto?' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'RE', lyric: 'Si debo usar palabras' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'Como ' },
              { chord: 'sim', lyric: 'Flota ' },
              { chord: 'lam', lyric: 'Cubana ' },
              { chord: 'RE', lyric: 'de Pesca' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL*', lyric: 'Y ' },
              { chord: 'RE4', lyric: 'Playa ' },
              { chord: 'DO9', lyric: 'Gi' },
              { chord: 'RE4', lyric: 'rón.' },
            ],
          },
        ],
      },
      {
        marker: '(A)',
        lines: [
          { type: 'lyric-only', text: 'Compañeros de música' },
          { type: 'lyric-only', text: 'Tomando en cuenta esas politonales' },
          { type: 'lyric-only', text: 'Y audaces canciones' },
          { type: 'lyric-only', text: 'Quisiera preguntar —me urge—' },
          { type: 'lyric-only', text: '¿Qué tipo de armonías' },
          { type: 'lyric-only', text: 'Se debe usar para hacer' },
          { type: 'lyric-only', text: 'La canción de este barco' },
          { type: 'lyric-only', text: 'Con hombres de poca niñez?' },
          { type: 'lyric-only', text: 'Hombres y solamente' },
          { type: 'lyric-only', text: 'Hombres sobre cubierta' },
          { type: 'lyric-only', text: 'Hombres negros y rojos' },
          { type: 'lyric-only', text: 'Y azules los hombres que pueblan' },
          { type: 'lyric-only', text: 'El Playa Girón.' },
        ],
      },
      {
        marker: '(A)',
        lines: [
          { type: 'lyric-only', text: 'Compañeros de historia' },
          { type: 'lyric-only', text: 'Tomando en cuenta' },
          { type: 'lyric-only', text: 'Lo implacable' },
          { type: 'lyric-only', text: 'que debe ser la verdad' },
          { type: 'lyric-only', text: 'Quisiera preguntar —me urge tanto—' },
          { type: 'lyric-only', text: '¿Qué debiera decir, qué fronteras debo respetar?' },
          { type: 'lyric-only', text: 'Si alguien roba comida' },
          { type: 'lyric-only', text: 'Y después da la vida, ¿qué hacer?' },
          { type: 'lyric-only', text: '¿Hasta dónde debemos' },
          { type: 'lyric-only', text: 'Practicar las verdades?' },
          { type: 'lyric-only', text: '¿Hasta dónde sabemos?' },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'Que escriban ' },
              { chord: 'sim', lyric: 'pues la historia' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'FA', lyric: 'Su historia, ' },
              { chord: 'DO', lyric: 'los ' },
              { chord: 'lam', lyric: 'hom' },
              { chord: 'RE', lyric: 'bres' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL*', lyric: 'Del ' },
              { chord: 'RE4', lyric: 'Playa ' },
              { chord: 'DO9', lyric: 'Gi' },
              { chord: 'RE4', lyric: 'rón. ' },
              { chord: 'SOL*', lyric: '' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ojala',
    title: 'ojalá',
    subtitle: 'Al final de este viaje',
    artist: 'Silvio Rodríguez',
    pageNumber: 20,
    originalKey: 'SOL',
    chords: ['SOL', 'sim', 'DO', 'RE', 'mim', 'lam', 'SI7'],
    sections: [
      {
        marker: '(Intro)',
        lines: [
          { type: 'chord-only', text: 'SOL - sim - DO - RE (x2)' },
        ],
      },
      {
        marker: '(A)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Ojalá que las hojas ' },
              { chord: 'sim', lyric: 'no te toquen el cuerpo ' },
              { chord: 'DO', lyric: 'cuando caigan' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'RE', lyric: 'Para que no las puedas convertir ' },
              { chord: 'SOL', lyric: 'en cristal' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'sim', lyric: 'Ojalá que la lluvia ' },
              { chord: 'DO', lyric: 'deje de ser milagro ' },
              { chord: 'RE', lyric: 'que baja por tu cuerpo' },
            ],
          },
        ],
      },
      {
        marker: '(B)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'mim', lyric: 'Ojalá que la luna ' },
              { chord: 'SI7', lyric: 'pueda salir sin ti' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'Ojalá que la tierra ' },
              { chord: 'RE', lyric: 'no te bese los pasos' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Ojalá se te acabe ' },
              { chord: 'sim', lyric: 'la mirada constante' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'La palabra precisa, ' },
              { chord: 'RE', lyric: 'la sonrisa perfecta' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Ojalá pase algo ' },
              { chord: 'sim', lyric: 'que te borre de pronto' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'Una luz cegadora, ' },
              { chord: 'RE', lyric: 'un disparo de nieve' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Ojalá por lo menos ' },
              { chord: 'sim', lyric: 'que me lleve la muerte' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'Para no verte tanto, ' },
              { chord: 'RE', lyric: 'para no verte siempre' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'DO', lyric: 'En todos los segundos, ' },
              { chord: 'RE', lyric: 'en todas las visiones' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'SOL', lyric: 'Ojalá...' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'nada-nuevo-bajo-el-sol',
    title: 'nada nuevo bajo el sol',
    subtitle: 'Compositores: Mauricio Gustavo Durán Fernández / Francisco Javier Durán Fernández',
    artist: 'Los Bunkers',
    pageNumber: 21,
    originalKey: 'F#m',
    intro: 'F#m - C#m (x2)',
    chords: ['F#m', 'C#m', 'E', 'Bm', 'D', 'A', 'G'],
    sections: [
      {
        marker: '(VERSO 1)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Minutos antes de que ' },
              { chord: 'C#m', lyric: 'den las tres' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'igual que ayer y ' },
              { chord: 'C#m', lyric: 'antes de ayer' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: 'sigo mirando al techo ' },
              { chord: 'Bm', lyric: 'una y otra vez' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'como si no tuviera ' },
              { chord: 'C#m', lyric: 'nada más que hacer' },
            ],
          },
        ],
      },
      {
        marker: '(VERSO 2)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Yo nunca me sen' },
              { chord: 'C#m', lyric: 'tí tan tonto' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'al menos nunca ' },
              { chord: 'C#m', lyric: 'como tú' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: 'no quiero levantar sos' },
              { chord: 'Bm', lyric: 'pechas sobre mi' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'espero que no tengas ' },
              { chord: 'C#m', lyric: 'nada que decir' },
            ],
          },
        ],
      },
      {
        marker: '(CORO)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Lo intento todo ' },
              { chord: 'E', lyric: 'para ser' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'mejor de que lo fui' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'de lo que fui hasta ayer' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'No hay nada nuevo ' },
              { chord: 'E', lyric: 'bajo el sol' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'ni escombros de un amor' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'que pueda recoger, no tengo nada que' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'es' },
              { chord: 'F#m', lyric: 'con' },
              { chord: 'C#m', lyric: 'der...' },
            ],
          },
          {
            type: 'chord-only',
            text: 'A - F#m - C#m - C#m',
          },
        ],
      },
      {
        marker: '(VERSO 3)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Algunos ya no ' },
              { chord: 'C#m', lyric: 'saben que es amar' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'se portan bien cuando ' },
              { chord: 'C#m', lyric: 'las tratan mal' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: 'se miran al espejo todo el ' },
              { chord: 'Bm', lyric: 'tiempo para ver' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'las marcas que quedaron ' },
              { chord: 'C#m', lyric: 'presas en su piel' },
            ],
          },
        ],
      },
      {
        marker: '(CORO)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Lo intento todo ' },
              { chord: 'E', lyric: 'para ser' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'mejor de que lo fui' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'de lo que fui hasta ayer' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'No hay nada nuevo ' },
              { chord: 'E', lyric: 'bajo el sol' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'ni escombros de un amor' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'que pueda recoger, no tengo nada que' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'es' },
              { chord: 'F#m', lyric: 'con' },
              { chord: 'C#m', lyric: 'der...' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'no ' },
              { chord: 'F#m', lyric: 'tengo ' },
              { chord: 'C#m', lyric: 'nada que esconder' },
            ],
          },
        ],
      },
      {
        marker: '(PUENTE)',
        lines: [
          {
            type: 'chord-only',
            text: 'E - Bm - D - A',
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'Si fuera más de frente' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'o un poco más valiente' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'no bastaría con de' },
              { chord: 'C#m', lyric: 'jarlo todo así' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'Rebobinar las horas' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'no es lo que más me importa' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'yo sólo cuento con que es' },
              { chord: 'E', lyric: 'tés aquí...' },
            ],
          },
        ],
      },
      {
        marker: '(CORO FINAL)',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Lo intento todo ' },
              { chord: 'E', lyric: 'para ser' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'mejor de que lo fui' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'de lo que fui hasta ayer' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'No hay nada nuevo ' },
              { chord: 'E', lyric: 'bajo el sol' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'ni escombros de un amor' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'que pueda recoger' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'no ' },
              { chord: 'F#m', lyric: 'tengo ' },
              { chord: 'C#m', lyric: 'nada que esconder' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'no ' },
              { chord: 'F#m', lyric: 'tengo ' },
              { chord: 'C#m', lyric: 'nada que esconder...' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A', lyric: 'uu' },
              { chord: 'F#m', lyric: 'oooh' },
              { chord: 'C#m', lyric: 'hhhh...' },
            ],
          },
          {
            type: 'chord-only',
            text: 'A - F#m - C#m - C#m',
          },
        ],
      },
    ],
  },
  {
    id: 'te-recuerdo-amanda',
    title: 'te recuerdo amanda',
    subtitle: 'Víctor Jara (Tono: G / Cifra Club con Intro Tab)',
    artist: 'Víctor Jara',
    pageNumber: 22,
    originalKey: 'G',
    intro: 'G7M - A - G6 - A - G6',
    chords: ['G7M', 'A', 'G6', 'D', 'F#m', 'G', 'C', 'D6', 'Bm', 'Bm/F#', 'A7M', 'A7M/E', 'Em/G', 'E', 'Em'],
    sections: [
      {
        marker: '[Tab - Intro - 2x]',
        lines: [
          { type: 'comment', text: 'Parte 1 de 3 (G7M  A)' },
          {
            type: 'tab',
            text: `E|----7-----7-----0-----0-----0-------------|
B|-------7-----5-----------5----------------|
G|-0-----------------6----------------------|
D|------------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
          { type: 'comment', text: 'Parte 2 de 3 (G6  A)' },
          {
            type: 'tab',
            text: `E|----------------0-----0-----0-------------|
B|----5-----5--------------5----------------|
G|-------4-----7-----6----------------------|
D|-5----------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
          { type: 'comment', text: 'Parte 3 de 3 (G6)' },
          {
            type: 'tab',
            text: `E|----------------0-------------------------|
B|----5-----5-------------------------------|
G|-------4-----7----------------------------|
D|-5----------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
        ],
      },
      {
        marker: '[Estribillo]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'Te recuerdo Amanda' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'La calle mojada' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'Corriendo a la fábrica' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'C', lyric: 'Donde traba' },
              { chord: 'D6', lyric: 'jaba Manuel' },
            ],
          },
          {
            type: 'lyric-only',
            text: 'La sonrisa ancha',
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'La lluvia en el pelo' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'No importaba nada' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'C', lyric: 'Ibas a encon' },
              { chord: 'D6', lyric: 'trarte con él' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'Con él, con él, con él, con él' },
            ],
          },
        ],
      },
      {
        marker: '[Primera Parte]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm/F#', lyric: 'Son ' },
              { chord: 'A', lyric: 'cinco minutos' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M', lyric: 'La vida es eterna' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M/E', lyric: 'En cinco ' },
              { chord: 'Em/G', lyric: 'minutos' },
            ],
          },
        ],
      },
      {
        marker: '[Pré-Refrão 1]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M', lyric: 'Suena la sirena' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Em/G', lyric: 'De vuelta al ' },
              { chord: 'A7M', lyric: 'trabajo' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Em/G', lyric: 'Y tu ca' },
              { chord: 'F#m', lyric: 'minando lo ilu' },
              { chord: 'G', lyric: 'minas todo' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: '( ' },
              { chord: 'Em', lyric: ') ' },
              { chord: 'G6', lyric: 'Los cinco minutos' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: 'Te hacen florecer' },
            ],
          },
        ],
      },
      {
        marker: '[Estribillo]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'Te recuerdo Amanda' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'La calle mojada' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'Corriendo a la fábrica' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'C', lyric: 'Donde traba' },
              { chord: 'D6', lyric: 'jaba Manuel' },
            ],
          },
          {
            type: 'lyric-only',
            text: 'La sonrisa ancha',
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'La lluvia en el pelo' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'No importaba nada' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'C', lyric: 'Ibas a encon' },
              { chord: 'D6', lyric: 'trarte con él' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm', lyric: 'Con él, con él, con él, con él' },
            ],
          },
        ],
      },
      {
        marker: '[Segunda Parte]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Bm/F#', lyric: 'Que partió a ' },
              { chord: 'A', lyric: 'la sierra' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M', lyric: 'Que nunca hizo daño' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M/E', lyric: 'Que partió a ' },
              { chord: 'Em/G', lyric: 'la sierra' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'A7M', lyric: 'Y en cinco minutos' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Em/G', lyric: 'Quedó ' },
              { chord: 'A7M', lyric: 'destro' },
              { chord: 'Em/G', lyric: 'zado' },
            ],
          },
        ],
      },
      {
        marker: '[Pré-Refrão 2]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'Suena la sirena' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'De vuelta al trabajo' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'Em', lyric: 'Muchos ' },
              { chord: 'Em/G', lyric: 'no volvieron' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'E', lyric: 'Tampoco Manuel' },
            ],
          },
        ],
      },
      {
        marker: '[Estribillo Final]',
        lines: [
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'D', lyric: 'Te recuerdo Amanda' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'F#m', lyric: 'La calle mojada' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'G', lyric: 'Corriendo a la fábrica' },
            ],
          },
          {
            type: 'lyric-chord',
            tokens: [
              { chord: 'C', lyric: 'Donde traba' },
              { chord: 'D6', lyric: 'jaba Manuel' },
            ],
          },
          {
            type: 'chord-only',
            text: 'G7M - A - G6 - A - G6',
          },
        ],
      },
      {
        marker: '[Tab - Final]',
        lines: [
          { type: 'comment', text: 'Parte 1 de 3 (G7M  A)' },
          {
            type: 'tab',
            text: `E|-----7-----7----7-----7-----0-----0-----0-|
B|--------7----------7-----5-----------5----|
G|--0----------0-----------------6----------|
D|------------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
          { type: 'comment', text: 'Parte 2 de 3 (G6  A)' },
          {
            type: 'tab',
            text: `E|----------------0-----0-----0-------------|
B|----5-----5--------------5----------------|
G|-------4-----7-----6----------------------|
D|-5----------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
          { type: 'comment', text: 'Parte 3 de 3 (G6)' },
          {
            type: 'tab',
            text: `E|----------------0-------------------------|
B|----5-----5-------------------------------|
G|-------4-----7----------------------------|
D|-5----------------------------------------|
A|------------------------------------------|
E|------------------------------------------|`,
          },
        ],
      },
    ],
  },
];
