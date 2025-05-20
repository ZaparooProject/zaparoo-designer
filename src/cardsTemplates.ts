import tapToHorizontal from './assets/tapto_horizontal.svg';
import tapToVertical from './assets/tapto_vertical.svg';
import tapToHu from './assets/tapto_hucard.svg';
import tapToHuSteam from './assets/tapto_hucard_steam.svg';
import tapToHuSteamVR from './assets/tapto_hucard_steamVR.svg';
import tapToHuC64 from './assets/tapto_hucard_c64.svg';
import tapToGB from './assets/tapto_gameboy_f.svg';
import tapToFloppy from './assets/tapto_floppy.svg';
import floppy525 from './assets/tapto_floppy525.svg';
import taptoNes from './assets/tapto_nes.svg';
import tapToGenesis from './assets/tapto_genesis.svg';
import pcEngine from './assets/pcengine.svg';
import animeOt4ku from './assets/tapto_0t4ku.svg';
import cassetTape from './assets/cassette_tape.svg';
import mininfcAlice from './assets/3by5_steam.svg';
import r2PcbCardFront from './assets/RetroRemake_PCBCardRev1-0.svg';
import upgradeStickerZTCSFull from './assets/ZapTradingCard_Single_Full.svg';
import upgradeStickerZTCSFrame from './assets/ZapTradingCard_Single_Frame.svg';
import upgradeStickerZTCSRounded from './assets/ZapTradingCard_Single_RoundFrame.svg';
import upgradeStickerZTCDFull from './assets/ZapTradingCard_Double_Full.svg';
import upgradeStickerZTCDFrame from './assets/ZapTradingCard_Double_Frame.svg';
import upgradeStickerZTCDRounded from './assets/ZapTradingCard_Double_RoundFrame.svg';
import gameCardVertical from './assets/fossHuCardLabel.svg';
import blankCoverH from './assets/blank_cover_h.svg';
import blankCoverV from './assets/blank_cover_v.svg';
import blankFitH from './assets/blank_fit_h.svg';
import blankFitV from './assets/blank_fit_v.svg';
import cassetteTapeEmpty from './assets/cassette_tape_empty.svg';

// import upgradeStickerStdFull from './assets/UpgradeStandard_Single_Full.svg';
// import upgradeStickerStdFrame from './assets/UpgradeStandard_Single_Frame.svg';
import { Authors } from './templateAuthors';
import type { templateTypeV2 } from './resourcesTypedef';
// import { logoResource } from './logos';

import {
  NFCCCsizeCard,
  NFCCCsizeSlimCard,
  TapeBoxCover,
  tapToPrePrinted,
  miniNfcCard,
  r2Pcb1_0,
} from './printMediaTypes';

export const templates: Record<string, templateTypeV2> = {
  gameCardV: {
    version: 2,
    layout: 'vertical',
    url: gameCardVertical,
    label: 'Game card Vertical',
    author: Authors.tim,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'gameCardV',
  },
  tapto2: {
    version: 2,
    layout: 'horizontal',
    url: tapToHorizontal,
    label: 'Tap-to H',
    author: Authors.tim,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'tapto2',
  },
  tapto3: {
    version: 2,
    layout: 'vertical',
    url: tapToVertical,
    label: 'Tap-to V',
    author: Authors.tim,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'tapto3',
  },
  hucard: {
    version: 2,
    layout: 'vertical',
    url: tapToHu,
    label: 'HuCard',
    author: Authors.tim,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'hucard',
  },
  hucardsteam: {
    version: 2,
    layout: 'vertical',
    url: tapToHuSteam,
    label: 'HuCardSteam',
    author: Authors.ewrt,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'hucardsteam',
  },
  hucardsteamVR: {
    version: 2,
    layout: 'vertical',
    url: tapToHuSteamVR,
    label: 'HuCardSteamVR',
    author: Authors.ewrt,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'hucardsteamVR',
  },
  hucardc64: {
    version: 2,
    layout: 'vertical',
    url: tapToHuC64,
    label: 'HuCard (C64)',
    author: Authors.ben,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'hucardc64',
  },
  taptoGB: {
    version: 2,
    layout: 'horizontal',
    url: tapToGB,
    label: 'Tap-to Gameboy',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'taptoGB',
  },
  taptoFloppy: {
    version: 2,
    layout: 'vertical',
    url: tapToFloppy,
    label: 'Floppy 3.5',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'taptoFloppy',
  },
  taptoFloppy525: {
    version: 2,
    layout: 'vertical',
    url: floppy525,
    label: 'Floppy 5.25',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'taptoFloppy525',
  },
  tapToNes: {
    layout: 'vertical',
    version: 2,
    url: taptoNes,
    label: 'Nes',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'tapToNes',
  },
  tapToGenesis: {
    version: 2,
    layout: 'vertical',
    url: tapToGenesis,
    label: 'Genesis',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'tapToGenesis',
  },
  tapToPcEngine: {
    version: 2,
    layout: 'vertical',
    url: pcEngine,
    label: 'PcEngineCD',
    author: Authors.ariel,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'tapToPcEngine',
  },
  anime0taku: {
    version: 2,
    canEdit: true,
    layout: 'vertical',
    url: animeOt4ku,
    // edits: [
    //   {
    //     id: 'placeholder_logo',
    //     resource: logoResource,
    //   },
    // ],
    label: 'full image + system',
    author: Authors.animeotaku,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'anime0taku',
  },
  cassetteBox: {
    version: 2,
    url: cassetteTapeEmpty,
    layout: 'horizontal',
    label: 'Casset box placeholder',
    author: Authors.animeotaku, // to be changed with Phoneix data
    media: TapeBoxCover,
    compatibleMedia: [TapeBoxCover],
    key: 'cassetteBoxBlank',
  },
  cassetteBoxV2: {
    layout: 'horizontal',
    label: 'Casset box cover',
    url: cassetTape,
    version: 2,
    canEdit: true,
    author: Authors.animeotaku, // to be changed with Phoneix data
    media: TapeBoxCover,
    compatibleMedia: [TapeBoxCover],
    key: 'cassetteBoxV2',
  },
  miniNfcAlice: {
    version: 2,
    layout: 'vertical',
    label: 'Steam 3by5cm',
    url: mininfcAlice,
    author: Authors.alice,
    media: miniNfcCard,
    compatibleMedia: [miniNfcCard],
    key: 'miniNfcAlice',
  },
  retroRemakePcb1: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'NFC PCB 1.0 - Framed',
    url: r2PcbCardFront,
    author: Authors.wizzo,
    media: r2Pcb1_0,
    compatibleMedia: [r2Pcb1_0],
    key: 'retroRemakePcb1',
  },
  upgradeStickerT1: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Single Full',
    url: upgradeStickerZTCSFull,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT1',
  },
  upgradeStickerT2: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Single Frame',
    url: upgradeStickerZTCSFrame,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT2',
  },
  upgradeStickerT6: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Single Frame Rounded',
    url: upgradeStickerZTCSRounded,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT6',
  },
  upgradeStickerT3: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Double Full',
    url: upgradeStickerZTCDFull,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT3',
  },
  upgradeStickerT4: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Double Frame',
    url: upgradeStickerZTCDFrame,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT4',
  },
  upgradeStickerT5: {
    canEdit: true,
    version: 2,
    layout: 'vertical',
    label: 'Trading Card - Double Frame Rounded',
    url: upgradeStickerZTCDRounded,
    author: Authors.tim,
    media: tapToPrePrinted,
    compatibleMedia: [tapToPrePrinted],
    key: 'upgradeStickerT5',
  },
  blankH: {
    version: 2,
    layout: 'horizontal',
    label: 'Blank H cover',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'blankH',
    url: blankCoverH,
  },
  blankV: {
    version: 2,
    layout: 'vertical',
    label: 'Blank V cover',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'blankV',
    url: blankCoverV,
  },
  blankHF: {
    version: 2,
    layout: 'horizontal',
    label: 'Blank H fit',
    url: blankFitH,
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'blankHF',
  },
  blankVF: {
    version: 2,
    layout: 'vertical',
    label: 'Blank V fit',
    author: Authors.andrea,
    media: NFCCCsizeCard,
    compatibleMedia: [NFCCCsizeCard, NFCCCsizeSlimCard],
    key: 'blankVF',
    url: blankFitV,
  },
} as const;

export const defaultTemplateKey = 'hucard';
export const defaultTemplate = templates[defaultTemplateKey];
