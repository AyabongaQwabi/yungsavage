export type Track = {
  id: string
  number: number
  title: string
  feature?: string
  tag?: string
  /** public path to mp3 preview, undefined if not yet available */
  audio?: string
  price: number
}

export const ALBUM = {
  title: 'INVASION',
  artist: 'YungSavage QTN',
  realName: 'Siyamkela Kemka',
  hometown: 'Queenstown, Eastern Cape',
  releaseDate: 'June 20, 2026',
  label: 'QTN Records',
  credit: 'DrippaValleyEnt',
  tagline: 'They call it chaos. I call it survival.',
  price: 140,
  cover: '/images/invasion-cover-front.jpg',
  coverBack: '/images/invasion-cover-back.jpg',
}

export const TRACKS: Track[] = [
  { id: 'they-know', number: 1, title: 'They_Know', price: 30,  audio: '/audio/they-know.mp3' },
  {
    id: 'spirit-up',
    number: 2,
    title: 'Spirit Up',
    feature: 'Siyanda the Vocalist',
    audio: '/audio/spirit-up.mp3',
    price: 30,
  },
  {
    id: 'far',
    number: 3,
    title: 'Far',
    feature: 'EasyD Rsa',
    audio: '/audio/far.mp3',
    price: 30,
  },
  {
    id: 'intaba',
    number: 4,
    title: 'Intaba',
    audio: '/audio/intaba.mp3',
    price: 30,
  },
  {
    id: 'emazweni',
    number: 5,
    title: 'Emazweni',
    audio: '/audio/emazweni.mp3',
    price: 30,
  },
  {
    id: 'oko',
    number: 6,
    title: 'Oko',
    feature: 'Liko Nika',
    audio: '/audio/oko.mp3',
    price: 30,
  },
  {
    id: 'dont-worry',
    number: 7,
    title: 'Dont Worry',
    tag: 'Interlude',
    audio: '/audio/dont-worry.mp3',
    price: 25,
  },
  {
    id: 'self-lxfe',
    number: 8,
    title: 'Self Lxfe',
    tag: 'Interlude II',
    audio: '/audio/self-lxfe.mp3',
    price: 25,
  },
  {
    id: 'siyababona',
    number: 9,
    title: 'Siyababona',
    feature: 'King Vado & BigT',
    audio: '/audio/siyababona.mp3',
    price: 35,
  },
  {
    id: 'ekasi',
    number: 10,
    title: 'eKasi',
    feature: 'Mabhiza Lowna',
    audio: '/audio/ekasi.mp3',
    price: 35,
  },
  {
    id: 'song-to-remember',
    number: 11,
    title: 'Song To Remember',
    feature: 'BigT',
    audio: '/audio/song-to-remember.mp3',
    price: 35,
  },
  {
    id: 'for-the-streets',
    number: 12,
    title: 'For The Streets',
    feature: 'Mlibo',
    audio: '/audio/for-the-streets.mp3',
    price: 30,
  },
  {
    id: 'put-in-work',
    number: 13,
    title: 'Put In Work',
    audio: '/audio/put-in-work.mp3',
    feature: 'Star',
    price: 30,
  },
]

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  premium?: boolean
}

export const MERCH: Product[] = [
  {
    id: 'album-digital',
    name: 'INVASION — Full Digital Album',
    description:
      '13 tracks. Instant download in high-quality audio plus digital booklet artwork.',
    price: 140,
    image: '/images/invasion-cover-front.jpg',
    badge: 'Best Value',
  },
  {
    id: 'bundle-deluxe',
    name: 'Royal Kasi Deluxe Bundle',
    description:
      'Digital album + limited INVASION tee + signed digital art card. Township royalty package.',
    price: 450,
    image: '/images/artist-street.jpg',
    badge: 'Premium',
    premium: true,
  },
  {
    id: 'merch-tee',
    name: 'INVASION Tee',
    description:
      'Heavyweight black tee with red + gold INVASION print. Unisex, kasi-ready.',
    price: 320,
    image: '/images/artist-night.jpg',
  },
  {
    id: 'ticket-live',
    name: 'Live Show Ticket — Queenstown',
    description:
      'General access to the INVASION launch performance. Experience the movement live.',
    price: 180,
    image: '/images/artist-blue.jpg',
    badge: 'Live',
  },
]

export const VIDEOS = [
  {
    id: 'oko',
    title: 'Oko (ft. Liko Nika)',
    type: 'Official Visualizer',
    image: '/images/artist-night.jpg',
  },
  {
    id: 'ekasi',
    title: 'eKasi (ft. Mabhiza Lowna)',
    type: 'Music Video',
    image: '/images/artist-street.jpg',
  },
  {
    id: 'far',
    title: 'Far (ft. EasyD Rsa)',
    type: 'Performance',
    image: '/images/artist-blue.jpg',
  },
]

export const formatZAR = (amount: number) =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(amount)
