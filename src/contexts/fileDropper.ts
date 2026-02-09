import type { MutableRefObject } from 'react';
import { createContext, useContext } from 'react';
import type { StaticCanvas } from 'fabric';
import type { templateTypeV2 } from '../resourcesTypedef';
import type { SearchResult } from '../../netlify/apiProviders/types.mts';

export type PossibleFile = File | HTMLImageElement | null;

export type CardData = {
  /* the source of the main image */
  file: PossibleFile;
  game: Partial<SearchResult>;
  canvas?: StaticCanvas;
  template?: templateTypeV2;
  isSelected: boolean;
  colors: string[];
  originalColors: string[];
  key: string;
};

export type contextType = {
  files: PossibleFile[];
  addFiles: (files: PossibleFile[], games?: SearchResult[]) => void;
  setFiles: (files: PossibleFile[]) => void;
  cards: MutableRefObject<CardData[]>;
  removeCards: () => void;
  deleteCardByIndex: (index: number) => void;
  duplicateCardByIndex: (index: number) => void;
  selectedCardsCount: number;
  setSelectedCardsCount: (qty: number) => void;
  editingCard: CardData | null;
  setEditingCard: (index: number) => void;
};

export const FileDropContext = createContext<contextType>({
  files: [],
  cards: {
    current: [],
  },
  addFiles: () => {},
  setFiles: () => {},
  removeCards: () => {},
  deleteCardByIndex: () => {},
  duplicateCardByIndex: () => {},
  selectedCardsCount: 0,
  setSelectedCardsCount: () => {},
  editingCard: null,
  setEditingCard: () => {},
});

export const useFileDropperContext = () => useContext(FileDropContext);
