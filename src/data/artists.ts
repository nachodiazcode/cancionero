export interface Artist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  bio?: string;
  songIds: string[];
}

export const ARTISTS: Artist[] = [
  {
    id: 'silvio-rodriguez',
    name: 'Silvio Rodríguez',
    genre: 'Nueva Trova Cubana',
    imageUrl: '/artists/silvio-rodriguez.jpg',
    bio: 'Cancionero esencial de la trova (Sueño con serpientes, Playa Girón, Ojalá).',
    songIds: ['sueno-con-serpientes', 'playa-giron', 'ojala'],
  },
  {
    id: 'los-bunkers',
    name: 'Los Bunkers',
    genre: 'Rock Chileno / Acústico',
    imageUrl: '/artists/los-bunkers.jpg',
    bio: 'Compositores: Mauricio Gustavo Durán Fernández / Francisco Javier Durán Fernández (Nada nuevo bajo el sol).',
    songIds: ['nada-nuevo-bajo-el-sol'],
  },
  {
    id: 'victor-jara',
    name: 'Víctor Jara',
    genre: 'Nueva Canción Chilena',
    imageUrl: '/artists/victor-jara.jpg',
    bio: 'Hito de la guitarra popular acústica (Te recuerdo Amanda con punteo y acordes Cifra Club).',
    songIds: ['te-recuerdo-amanda'],
  },
];

export function getArtistForSong(artistName: string): Artist | undefined {
  const norm = artistName.toLowerCase();
  return ARTISTS.find((a) => norm.includes(a.name.toLowerCase()) || a.name.toLowerCase().includes(norm));
}
