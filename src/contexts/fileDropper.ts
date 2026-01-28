import type { MutableRefObject } from 'react';
import { createContext, useContext } from 'react';
import type { StaticCanvas } from 'fabric';
import type { templateTypeV2 } from '../resourcesTypedef';
import type { SearchResult } from '../../netlify/apiProviders/types.mts';

export type CardData = {
  /* the source of the main image */
  file: File | HTMLImageElement;
  game: Partial<SearchResult>;
  canvas?: StaticCanvas;
  template?: templateTypeV2;
  isSelected: boolean;
  colors: string[];
  originalColors: string[];
  key: string;
};

export type contextType = {
  files: (File | HTMLImageElement)[];
  addFiles: (files: (File | HTMLImageElement)[], games: SearchResult[]) => void;
  setFiles: (files: (File | HTMLImageElement)[]) => void;
  cards: MutableRefObject<CardData[]>;
  removeCards: () => void;
  selectedCardsCount: number;
  setSelectedCardsCount: (qty: number) => void;
  selectedCardGame: CardData['game'];
  setSelectedCardGame: (g: CardData['game']) => void;
};

export const FileDropContext = createContext<contextType>({
  files: [],
  cards: {
    current: [],
  },
  addFiles: () => {},
  setFiles: () => {},
  removeCards: () => {},
  selectedCardsCount: 0,
  setSelectedCardsCount: () => {},
  selectedCardGame: {},
  setSelectedCardGame: () => {},
});

export const useFileDropperContext = () => useContext(FileDropContext);
