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
  setSelectedCards: (files: (File | HTMLImageElement)[]) => void;
  cards: CardData[];
  removeSelectedCards: () => void;
};

export const SelectionContext = createContext<contextType>({
  cards: [],
  removeSelectedCards: () => {},
  setSelectedCards: () => {},
});

export const useFileDropperContext = () => useContext(SelectionContext);
