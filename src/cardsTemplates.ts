import tapToHorizontal from './assets/tapto_horizontal.svg';
import tapToVertical from './assets/tapto_vertical.svg';
import tapToBg from './assets/tapto_pattern_bg.svg';
import tapToBgV from './assets/tapto_pattern_bg_vertical.svg';
import tapToHu from './assets/tapto_hucard.svg';
import tapToHuSteam from './assets/tapto_hucard_steam.svg';
import tapToHuSteamVR from './assets/tapto_hucard_steamVR.svg';
import tapToHuBg from './assets/tapto_hucard_bg.svg';
import tapToHuBgLarge from './assets/tapto_hucard_bg_large.svg';
import tapToHuC64 from './assets/tapto_hucard_c64.svg';
import tapToGB from './assets/tapto_gameboy_f.svg';
import emptyVertical from './assets/empty_vertical.svg';
import emptyHorizontal from './assets/empty_horizontal.svg';
import tapToFloppy from './assets/tapto_floppy.svg';
import floppy525 from './assets/tapto_floppy525.svg';
import floppy525Bg from './assets/tapto_floppy525_bg.svg';
import taptoNes from './assets/tapto_nes.svg';
import tapToGenesis from './assets/tapto_genesis.svg';
import genesisBg from './assets/genesis_bg.svg';
import pcEngine from './assets/pcengine.svg';
import pcEngineBG from './assets/pcengine_bg.svg';
import animeOt4ku from './assets/tapto_0t4ku.svg';
import mininfcAlice from './assets/3by5_steam.svg';
import cardFront from './assets/cardfront.png';
import { Authors } from './templateAuthors';
import { templateType } from './resourcesTypedef';
import { logoResource } from './logos';
import { cassetteTemplates } from './cassetteTemplates';
import { NFCCCsizeCard, TapeBoxCover, tapToPrePrinted, miniNfcCard } from './printMediaTypes';

export const templates: Record<string, templateType> = {
  blankH: {
    layout: 'horizontal',
    label: 'Blank H cover',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'blankH',
  },
  blankV: {
    layout: 'vertical',
    label: 'Blank V cover',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'blankV',
  },
  taptoPPHalf: {
    canEdit: true,
    layout: 'vertical',
    label: 'Half height tapto sticker',
    author: Authors.tim,
    media: tapToPrePrinted,
    key: 'taptoPPHalf',
    background: {
      hidePrint: true,
      url: cardFront,
      isSvg: false,
      layerHeight: 1050,
      layerWidth: 750,
    },
    overlay: {
      // full card size
      url: '',
      layerHeight: 1050,
      layerWidth: 750,
      x: 0.00,
      width: 1,
      y: 0.075,
      height: 0.415,
      isSvg: false,
      strategy: 'cover',
    },
    printableAreas: [{
      x: 0.00,
      width: 1,
      y: 0.075,
      height: 0.415,
    }],
  },
  taptoPPFull: {
    canEdit: true,
    layout: 'vertical',
    label: 'Full height tapto sticker',
    author: Authors.tim,
    media: tapToPrePrinted,
    key: 'taptoPPFull',
    background: {
      hidePrint: true,
      url: cardFront,
      isSvg: false,
      layerHeight: 1050,
      layerWidth: 750,
    },
    overlay: {
      // full card size
      url: '',
      layerHeight: 1050,
      layerWidth: 750,
      x: 0.00,
      width: 1,
      y: 0.075,
      height: 0.855,
      isSvg: false,
      strategy: 'cover',
    },
    printableAreas: [{
      x: 0.00,
      width: 1,
      y: 0.075,
      height: 0.855,
    }],
  },
  blankHF: {
    layout: 'horizontal',
    label: 'Blank H fit',
    overlay: {
      // full card size
      url: emptyHorizontal,
      layerWidth: 975,
      layerHeight: 600,
      x: 0.04,
      width: 0.92,
      y: 0.02,
      height: 0.96,
      isSvg: true,
    },
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'blankHF',
  },
  blankVF: {
    layout: 'vertical',
    label: 'Blank V fit',
    overlay: {
      // full card size
      url: emptyVertical,
      layerWidth: 600,
      layerHeight: 975,
      x: 0.02,
      width: 0.96,
      y: 0.04,
      height: 0.92,
      isSvg: true,
    },
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'blankVF',
  },
  tapto2: {
    layout: 'horizontal',
    overlay: {
      layerWidth: 994,
      layerHeight: 619,
      url: tapToHorizontal,
      width: 1 - (310 + 37) / 994,
      height: 1 - (37 * 2) / 619,
      x: 310 / 994,
      y: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 994,
      layerHeight: 619,
      url: tapToBg,
      isSvg: true,
    },
    label: 'Tap-to H',
    author: Authors.tim,
    media: NFCCCsizeCard,
    key: 'tapto2',
  },
  tapto3: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToVertical,
      width: 1 - (37 * 2) / 619,
      height: 1 - (37 + 144) / 994,
      x: 37 / 619,
      y: 37 / 994,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToBgV,
      isSvg: true,
    },
    label: 'Tap-to V',
    author: Authors.tim,
    media: NFCCCsizeCard,
    key: 'tapto3',
  },
  hucard: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHu,
      height: 1 - (84 + 268) / 994,
      width: 1 - (37 * 2) / 619,
      y: 268 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuBg,
      isSvg: true,
    },
    label: 'HuCard',
    author: Authors.tim,
    media: NFCCCsizeCard,
    key: 'hucard',
  },
  hucardsteam: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuSteam,
      height: 1 - (84 + 125) / 994,
      width: 1 - (37 * 2) / 619,
      y: 168 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuBgLarge,
      isSvg: true,
    },
    label: 'HuCardSteam',
    author: Authors.ewrt,
    media: NFCCCsizeCard,
    key: 'hucardsteam',
  },
  hucardsteamVR: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuSteamVR,
      height: 1 - (84 + 125) / 994,
      width: 1 - (37 * 2) / 619,
      y: 168 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuBgLarge,
      isSvg: true,
    },
    label: 'HuCardSteamVR',
    author: Authors.ewrt,
    media: NFCCCsizeCard,
    key: 'hucardsteamVR',
  },
  hucardc64: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuC64,
      height: 1 - (84 + 268) / 994,
      width: 1 - (37 * 2) / 619,
      y: 268 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToHuBg,
      isSvg: true,
    },
    label: 'HuCard (C64)',
    author: Authors.ben,
    media: NFCCCsizeCard,
    key: 'hucardc64',
  },
  taptoGB: {
    layout: 'horizontal',
    overlay: {
      layerWidth: 994,
      layerHeight: 619,
      url: tapToGB,
      width: 1 - (310 + 37) / 994,
      height: 1 - (37 * 2) / 619,
      x: 310 / 994,
      y: 37 / 619,
      isSvg: true,
    },
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
    background: {
      layerWidth: 994,
      layerHeight: 619,
      url: tapToBg,
      isSvg: true,
    },
    label: 'Tap-to Gameboy',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    key: 'taptoGB',
  },
  taptoFloppy: {
    layout: 'vertical',
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: '',
      width: 1 - (76 + 77) / 619,
      height: 1 - (276 + 10) / 994,
      x: 77 / 619,
      y: 276 / 994,
      isSvg: false,
    },
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToFloppy,
      isSvg: true,
    },
    label: 'Floppy 3.5',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'taptoFloppy',
  },
  taptoFloppy525: {
    layout: 'vertical',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: floppy525Bg,
      isSvg: true,
    },
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: floppy525,
      width: 1 - (20 + 44) / 619,
      height: 316 / 994,
      x: 20 / 619,
      y: 12.6 / 994,
      isSvg: true,
    },
    label: 'Floppy 5.25',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    key: 'taptoFloppy525',
  },
  tapToNes: {
    layout: 'vertical',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToBgV,
      isSvg: true,
    },
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: taptoNes,
      width: 1 - (37 * 2) / 619,
      height: 1 - (37 + 144) / 994,
      x: 37 / 619,
      y: 37 / 994,
      isSvg: true,
    },
    label: 'Nes',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    key: 'tapToNes',
  },
  tapToGenesis: {
    layout: 'vertical',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: genesisBg,
      isSvg: true,
    },
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: tapToGenesis,
      height: 1 - (84 + 268) / 994,
      width: 1 - (37 * 2) / 619,
      y: 268 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    label: 'Genesis',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    key: 'tapToGenesis',
  },
  tapToPcEngine: {
    layout: 'vertical',
    background: {
      layerWidth: 619,
      layerHeight: 994,
      url: pcEngineBG,
      isSvg: true,
    },
    overlay: {
      layerWidth: 619,
      layerHeight: 994,
      url: pcEngine,
      height: 1 - (84 + 268) / 994,
      width: 1 - (37 * 2) / 619,
      y: 268 / 994,
      x: 37 / 619,
      isSvg: true,
    },
    label: 'PcEngineCD',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    key: 'tapToPcEngine',
  },
  anime0taku: {
    canEdit: true,
    layout: 'vertical',
    overlay: {
      layerWidth: 640,
      layerHeight: 1006,
      url: animeOt4ku,
      height: 1,
      width: 1,
      y: 0,
      x: 0,
      isSvg: true,
    },
    edits: [{
      id: 'placeholder_logo',
      resource: logoResource,
    }],
    label: 'full image + system',
    noMargin: true,
    author: Authors.animeotaku,
    media: NFCCCsizeCard,
    key: 'anime0taku',
  },
  cassetteBox: {
    layout: 'horizontal',
    label: 'Casset box placeholder',
    author: Authors.animeotaku, // to be changed with Phoneix data
    media: TapeBoxCover,
    key: 'cassetteBoxBlank',
  },
  miniNfcAlice: {
    layout: 'vertical',
    label: 'Steam 3by5cm',
    overlay: {
      url: mininfcAlice,
      isSvg: true,
      layerWidth: 354,
      layerHeight: 591,
      height: 445/591,
      width: 305/354,
      y: 117/591,
      x: 25/354,
    },
    author: Authors.alice,
    media: miniNfcCard,
    key: 'miniNfcAlice',
  },
  ...cassetteTemplates
} as const;

export const defaultTemplateKey = 'hucard';
export const defaultTemplate = templates[defaultTemplateKey];
