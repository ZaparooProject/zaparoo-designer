import { type CardData } from '../contexts/fileDropper';
import type { templateTypeV2 } from '../resourcesTypedef';
import { setTemplateV2OnCanvases } from './setTemplateV2';

export const applyTemplateToSelectedCards = async (
  cards: CardData[],
  template: templateTypeV2,
) => {
  const selectedCards = cards.filter(
    (card): card is CardData & { canvas: NonNullable<CardData['canvas']> } =>
      card.isSelected && !!card.canvas,
  );

  if (!selectedCards.length) {
    return false;
  }

  await setTemplateV2OnCanvases(selectedCards, template);

  return true;
};
