import { useState, useMemo, useCallback, useRef } from 'react';
import type { FC, JSX } from 'react';
import {
  type CardData,
  FileDropContext,
  type PossibleFile,
  type contextType,
} from '../contexts/fileDropper';

type FileDropperProps = {
  children: JSX.Element | JSX.Element[];
};

export const FileDropperContextProvider: FC<FileDropperProps> = ({
  children,
}) => {
  const [files, setFilesImpl] = useState<PossibleFile[]>([]);
  const cards = useRef<CardData[]>([]);
  // the selection state needs to be refactored.
  const [selectedCardsCount, setSelectedCardsCount] = useState<number>(0);
  const [editingCard, setEditingCardImpl] = useState<CardData | null>(null);

  const addFiles = useCallback(
    (newFiles: PossibleFile[], games: CardData['game'][] = []) => {
      setFilesImpl([...files, ...newFiles]);
      cards.current.push(
        ...newFiles.map<CardData>((file, index) => ({
          file,
          game: games[index] || {},
          key: `${
            (file as File)?.name || (file as HTMLImageElement)?.src || 'empty'
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

  const setEditingCard = useCallback(
    (index: number) => {
      setEditingCardImpl(cards.current[index]);
    },
    [setEditingCardImpl],
  );

  const setFiles = useCallback(
    (totalFiles: PossibleFile[], games: CardData['game'][] = []) => {
      let newFiles: PossibleFile[] = [];
      if (totalFiles.length > files.length) {
        newFiles = totalFiles.slice(files.length - totalFiles.length);
      }
      setFilesImpl(totalFiles);
      cards.current.push(
        ...newFiles.map<CardData>((file, index) => ({
          file,
          game: games[index] || {},
          key: `${
            (file as File)?.name || (file as HTMLImageElement)?.src || 'empty'
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

  const deleteCardByIndex = useCallback(
    (index: number) => {
      const cardToDelete = cards.current[index];
      if (!cardToDelete) return;
      cards.current = cards.current.filter(
        (_, cardIndex) => cardIndex !== index,
      );
      setFilesImpl(files.filter((_, fileIndex) => fileIndex !== index));
      if (cardToDelete.isSelected) {
        setSelectedCardsCount((prev) => Math.max(0, prev - 1));
      }
      if (editingCard?.key === cardToDelete.key) {
        setEditingCardImpl(null);
      }
    },
    [files, editingCard, setSelectedCardsCount, setEditingCardImpl],
  );

  const contextValue = useMemo<contextType>(
    () => ({
      files,
      addFiles,
      setFiles,
      cards,
      removeCards,
      deleteCardByIndex,
      selectedCardsCount,
      setSelectedCardsCount,
      editingCard,
      setEditingCard,
    }),
    [
      files,
      addFiles,
      setFiles,
      removeCards,
      deleteCardByIndex,
      selectedCardsCount,
      editingCard,
      setEditingCard,
    ],
  );

  return (
    <FileDropContext.Provider value={contextValue}>
      {children}
    </FileDropContext.Provider>
  );
};
