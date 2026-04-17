import type { CardData } from '../contexts/fileDropper';

/** Mark every card as selected, return the new count. */
export function selectAllCards(cards: CardData[]): number {
  for (const card of cards) card.isSelected = true;
  return cards.length;
}

/** Mark every card as unselected, return 0. */
export function clearCardSelection(cards: CardData[]): number {
  for (const card of cards) card.isSelected = false;
  return 0;
}
