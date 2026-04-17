type TemplateAuthors = {
  name: string;
  href: string;
};

export const enum Authors {
  ariel,
  andrea,
  tim,
  animeotaku,
  ben,
  ewrt,
  alice,
  wizzo,
  unnamed1,
  danpatrick,
}

export const templateAuthors: Record<Authors, TemplateAuthors> = {
  [Authors.ariel]: {
    name: 'Ariel Aces',
    href: 'https://www.artisticpixels305.com/',
  },
  [Authors.andrea]: {
    name: 'Andrea Bogazzi',
    href: 'https://github.com/asturur',
  },
  [Authors.tim]: {
    name: 'Tim Wilsie',
    href: 'https://timwilsie.com/',
  },
  [Authors.animeotaku]: {
    name: 'Anime0t4ku',
    href: 'https://github.com/Anime0t4ku/TapToCassetteCovers',
  },
  [Authors.ben]: {
    name: 'Ben Squibb',
    href: 'https://github.com/Stat-Mat',
  },
  [Authors.ewrt]: {
    name: 'Ewrt',
    href: 'https://github.com/ewrt101',
  },
  [Authors.alice]: {
    name: 'Alice',
    href: 'https://github.com/alicecrawford',
  },
  [Authors.wizzo]: {
    name: 'wizzo',
    href: 'https://github.com/wizzomafizzo',
  },
  [Authors.unnamed1]: {
    name: '强哥',
    href: '',
  },
  [Authors.danpatrick]: {
    name: 'Dan Patrick',
    href: 'https://forums.launchbox-app.com/profile/85709-dan-patrick/content/?type=downloads_file',
  },
} as const;
