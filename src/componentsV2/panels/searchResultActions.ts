import type { SearchResult } from '../../../netlify/apiProviders/types.mts';
import type {
  CardData,
  PossibleFile,
} from '../../contexts/fileDropper';
import { getImage } from '../../utils/search';
import { setMainImageOnCanvas } from '../../hooks/useLabelEditor';
import { scaleImageToOverlayArea } from '../../utils/setTemplateV2';
import { getMainImage, getPlaceholderMain } from '../../utils/templateHandling';

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
  !!card.canvas?.getObjects().some((obj) => obj['zaparoo-user-layer'] === true);

const applyAsMainImageIfCardIsEmpty = async (
  card: CardData | undefined,
  file: PossibleFile,
) => {
  if (!card?.canvas || hasUserImageLayers(card)) {
    return;
  }

  await setMainImageOnCanvas(file, card.canvas);
  const placeholder = getPlaceholderMain(card.canvas);
  const mainImage = getMainImage(card.canvas);

  if (!placeholder || !mainImage) {
    card.canvas.requestRenderAll();
    return;
  }

  const index = card.canvas.getObjects().indexOf(placeholder);
  card.canvas.insertAt(index, mainImage);
  await scaleImageToOverlayArea(placeholder, mainImage);
  card.canvas.requestRenderAll();
};

type ApplySearchResultArgs = {
  addFiles: (files: PossibleFile[], games?: SearchResult[]) => void;
  cards: CardData[];
  editingCard: CardData | null;
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
    await applyAsMainImageIfCardIsEmpty(cards[targetIndex], file);
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
