import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import type { StaticCanvas } from 'fabric';
import type {
  CardData,
  PossibleFile,
} from '../../contexts/fileDropper';
import { getImage } from '../../utils/search';
import {
  applyMainImageIfCanvasIsEmpty,
  hasUserImageLayersOnCanvas,
} from '../../utils/applyMainImageToCanvas';

export const getActiveResultTargetIndex = (
  cards: CardData[],
  editingCard: CardData | null,
) => {
  if (editingCard) {
    const editingIndex = cards.indexOf(editingCard);
    if (editingIndex !== -1) {
      return editingIndex;
    }
  }

  return cards.findIndex((card) => card.isSelected);
};

export const hasUserImageLayers = (card: CardData) =>
  hasUserImageLayersOnCanvas(card.canvas);

const applyAsMainImageIfCardIsEmpty = async (
  card: CardData | undefined,
  file: PossibleFile,
  syncedCanvas?: StaticCanvas | null,
) => {
  if (!card?.canvas) {
    return;
  }

  const didApplyToSourceCard = await applyMainImageIfCanvasIsEmpty(
    card.canvas,
    file,
  );

  if (
    !didApplyToSourceCard ||
    !syncedCanvas ||
    syncedCanvas === card.canvas ||
    hasUserImageLayersOnCanvas(syncedCanvas)
  ) {
    return;
  }

  await applyMainImageIfCanvasIsEmpty(syncedCanvas, file);
};

type ApplySearchResultArgs = {
  addFiles: (files: PossibleFile[], games?: SearchResult[]) => void;
  cards: CardData[];
  editingCard: CardData | null;
  editingCanvas?: StaticCanvas | null;
  game: SearchResult;
  onSelectGame?: () => void;
  previewSrc: string;
  scheduleAddFiles?: (callback: () => void) => void;
  swapGameAtIndex: (
    file: PossibleFile,
    game: SearchResult,
    index: number,
  ) => void;
  url: string;
};

export const applySearchResultToCards = async ({
  addFiles,
  cards,
  editingCard,
  editingCanvas,
  game,
  onSelectGame,
  previewSrc,
  scheduleAddFiles,
  swapGameAtIndex,
  url,
}: ApplySearchResultArgs) => {
  const file = await getImage(url, previewSrc);
  const editingIndex = editingCard ? cards.indexOf(editingCard) : -1;
  const targetIndex =
    editingIndex !== -1
      ? editingIndex
      : getActiveResultTargetIndex(cards, editingCard);

  if (targetIndex !== -1) {
    swapGameAtIndex(file, game, targetIndex);
    await applyAsMainImageIfCardIsEmpty(
      cards[targetIndex],
      file,
      targetIndex === editingIndex ? editingCanvas : null,
    );
    if (targetIndex === editingIndex) {
      onSelectGame?.();
    }
    return;
  }

  const addNewCard = () => addFiles([file], [game]);
  if (scheduleAddFiles) {
    scheduleAddFiles(addNewCard);
    return;
  }

  addNewCard();
};
