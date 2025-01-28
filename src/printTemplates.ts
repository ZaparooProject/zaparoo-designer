export type PrintTemplate = {
  gridSize: [number, number];
  label: string;
  rows: number;
  columns: number;
  leftMargin: number;
  topMargin: number;
  // set those if you go for auto-arrange
  rightMargin?: number;
  bottomMargin?: number;
  paperSize: [number, number]; // in mm
};

export const printTemplates: Record<string, PrintTemplate> = {
  a4Auto: {
    gridSize: [0, 0],
    label: 'A4',
    rows: 0,
    columns: 0,
    leftMargin: 3,
    topMargin: 10,
    bottomMargin: 5,
    rightMargin: 3,
    paperSize: [210, 297],
  },
  verticalLetter: {
    gridSize: [0, 0],
    label: 'Letter',
    rows: 0,
    columns: 0,
    leftMargin: 5,
    topMargin: 10,
    bottomMargin: 5,
    rightMargin: 5,
    paperSize: [216, 279],
  },
  inch4by6: {
    gridSize: [0, 0],
    label: '4 by 6 inches',
    rows: 0,
    columns: 0,
    leftMargin: 5,
    topMargin: 10,
    bottomMargin: 5,
    rightMargin: 5,
    paperSize: [101, 152],
  },
  inch5by7: {
    gridSize: [0, 0],
    label: '5 by 7 inches',
    rows: 0,
    columns: 0,
    leftMargin: 5,
    topMargin: 1,
    bottomMargin: 1,
    rightMargin: 5,
    paperSize: [127, 177],
  },
  inch8by10: {
    gridSize: [0, 0],
    label: '8 by 10 inches',
    rows: 0,
    columns: 0,
    leftMargin: 5,
    topMargin: 10,
    bottomMargin: 5,
    rightMargin: 5,
    paperSize: [203, 254],
  },
  a3h: {
    gridSize: [0, 0],
    label: 'A3',
    paperSize: [297, 420],
    rows: 0,
    columns: 0,
    leftMargin: 5,
    topMargin: 10,
    bottomMargin: 5,
    rightMargin: 5,
  }
};

export const defaultPrinterTemplateKey = 'a4Auto';

export const defaultPrinterTemplate = printTemplates[defaultPrinterTemplateKey];
