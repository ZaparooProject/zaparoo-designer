import type { MutableRefObject } from 'react';
import { createContext, useContext } from 'react';
import type { StaticCanvas } from 'fabric';
import type { templateType } from '../resourcesTypedef';

export type CardData = {
  /* the source of the main image */
  file: File | HTMLImageElement,
  canvas?: StaticCanvas;
  template?: templateType;
  isSelected: boolean;
  colors: string[];
  originalColors: string[];
  key: string;
}

export type contextType = {
  files: (File | HTMLImageElement)[];
  setFiles: (files: (File | HTMLImageElement)[]) => void;
  cards: MutableRefObject<CardData[]>;
  removeCards: () => void;
  selectedCardsCount: number;
  setSelectedCardsCount: (qty: number) => void;
};

export const FileDropContext = createContext<contextType>({
  files: [],
  cards: {
    current: [],
  },
  setFiles: () => {},
  removeCards: () => {},
  selectedCardsCount: 0,
  setSelectedCardsCount: () => {},
});

export const useFileDropperContext = () => useContext(FileDropContext);
