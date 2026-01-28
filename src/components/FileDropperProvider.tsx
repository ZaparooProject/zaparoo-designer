import { useState, useMemo, useCallback, useRef } from 'react';
import type { FC, JSX } from 'react';
import {
  type CardData,
  FileDropContext,
  type contextType,
} from '../contexts/fileDropper';

type FileDropperProps = {
  children: JSX.Element | JSX.Element[];
};

export const FileDropperContextProvider: FC<FileDropperProps> = ({
  children,
}) => {
  const [files, setFilesImpl] = useState<(File | HTMLImageElement)[]>([]);
  const cards = useRef<CardData[]>([]);
  // the selection state needs to be refactored.
  const [selectedCardsCount, setSelectedCardsCount] = useState<number>(0);
  const [selectedCardGame, setSelectedCardGame] = useState<CardData['game']>(
    {},
  );

  const addFiles = useCallback(
    (newFiles: (File | HTMLImageElement)[], games: CardData['game'][] = []) => {
      setFilesImpl([...files, ...newFiles]);
      cards.current.push(
        ...newFiles.map<CardData>((file, index) => ({
          file,
          game: games[index] || {},
          key: `${
            (file as File).name || (file as HTMLImageElement).src
          }-${Date.now()}`,
          canvas: undefined,
          template: undefined,
          isSelected: false,
          colors: [],
          originalColors: [],
        })),
      );
    },
    [files, setFilesImpl],
  );

  const setFiles = useCallback(
    (
      totalFiles: (File | HTMLImageElement)[],
      games: CardData['game'][] = [],
    ) => {
      let newFiles: (File | HTMLImageElement)[] = [];
      if (totalFiles.length > files.length) {
        newFiles = totalFiles.slice(files.length - totalFiles.length);
      }
      setFilesImpl(totalFiles);
      cards.current.push(
        ...newFiles.map<CardData>((file, index) => ({
          file,
          game: games[index] || {},
          key: `${
            (file as File).name || (file as HTMLImageElement).src
          }-${Date.now()}`,
          canvas: undefined,
          template: undefined,
          isSelected: false,
          colors: [],
          originalColors: [],
        })),
      );
    },
    [files, cards],
  );

  const removeCards = useCallback(() => {
    const indexToRemove: number[] = [];
    cards.current = cards.current.filter((card, index) => {
      if (card.isSelected) {
        indexToRemove.push(index);
        return false;
      }
      return true;
    });
    setFilesImpl(
      files.filter((_, index) => {
        return !indexToRemove.includes(index);
      }),
    );
    setSelectedCardsCount(0);
  }, [files]);

  const contextValue = useMemo<contextType>(
    () => ({
      files,
      addFiles,
      setFiles: setFiles,
      cards,
      removeCards,
      selectedCardsCount,
      setSelectedCardsCount,
      selectedCardGame,
      setSelectedCardGame,
    }),
    [
      files,
      addFiles,
      setFiles,
      removeCards,
      selectedCardsCount,
      selectedCardGame,
      setSelectedCardGame,
    ],
  );

  return (
    <FileDropContext.Provider value={contextValue}>
      {children}
    </FileDropContext.Provider>
  );
};
