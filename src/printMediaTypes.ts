/**
 * A list of all the support label target for the app.
 */

import type { MediaDefinition } from './resourcesTypedef';

// Media definition define the media the label is planned to be applied to.
// Those options represent both canvas size and clipPath structure,
// and so are props of Fabric.Rect

// a standard credit card sized nfc card
export const NFCCCsizeCard: MediaDefinition = {
  width: 1004, // 3.346inch * 300dpi (85mm)
  height: 638, // 2.126inch * 300dpi, (54mm)
  rx: 35,
  ry: 35,
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white',
  label: 'Standard NFC card',
};

// or a musicasset box inlay cover
export const TapeBoxCover: MediaDefinition = {
  width: 1233, // 4.11inch * 300dpi
  height: 1200, // 4inch * 300dpi
  rx: 0,
  ry: 0,
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white',
  label: 'Cassette tape case',
};

export const tapToPrePrinted: MediaDefinition = {
  width: 1050, // 63mm * 300dpi
  height: 750, // 36mm * 300dpi
  rx: 35,
  ry: 35,
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white',
  label: 'Zap Trading Card',
};

// or a musicasset box inlay cover
export const miniNfcCard: MediaDefinition = {
  width: 591, //5cm * 300dpi
  height: 354, // 63mm * 300dpi
  rx: 8,
  ry: 8,
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white',
  label: 'Mini NFC card',
};

// retro remake pcb cards
export const r2Pcb1_0: MediaDefinition = {
  // TODO: these were swapped?
  height: 405.71, // 34.35mm * 300dpi
  width: 552.05, // 46.74mm * 300dpi
  rx: 0, // ???
  ry: 0, // ???
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white',
  label: 'Retro Remake NFC PCB',
};

export const mediaTargetList = [
  NFCCCsizeCard,
  tapToPrePrinted,
  miniNfcCard,
  r2Pcb1_0,
  TapeBoxCover,
  // taptoPrePrintedFullHeight,
];
