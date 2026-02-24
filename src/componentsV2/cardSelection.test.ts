import { describe, it, expect } from 'vitest';
import { selectAllCards, clearCardSelection } from './cardSelection';
import type { CardData } from '../contexts/fileDropper';

const makeCard = (isSelected = false): CardData =>
  ({
    file: null,
    game: {},
    isSelected,
    colors: [],
    originalColors: [],
    key: `card-${Math.random()}`,
  }) as CardData;

describe('selectAllCards', () => {
  it('should mark all cards as selected when none are selected', () => {
    const cards = [makeCard(), makeCard(), makeCard()];
    const count = selectAllCards(cards);
    expect(count).toBe(3);
    expect(cards.every((c) => c.isSelected)).toBe(true);
  });

  it('should return the card count when some are already selected', () => {
    const cards = [makeCard(true), makeCard(), makeCard(true)];
    const count = selectAllCards(cards);
    expect(count).toBe(3);
    expect(cards.every((c) => c.isSelected)).toBe(true);
  });

  it('should return 0 when the cards array is empty', () => {
    const count = selectAllCards([]);
    expect(count).toBe(0);
  });
});

describe('clearCardSelection', () => {
  it('should mark all cards as unselected when all are selected', () => {
    const cards = [makeCard(true), makeCard(true), makeCard(true)];
    const count = clearCardSelection(cards);
    expect(count).toBe(0);
    expect(cards.every((c) => !c.isSelected)).toBe(true);
  });

  it('should mark all cards as unselected when some are selected', () => {
    const cards = [makeCard(true), makeCard(), makeCard(true)];
    const count = clearCardSelection(cards);
    expect(count).toBe(0);
    expect(cards.every((c) => !c.isSelected)).toBe(true);
  });

  it('should return 0 when no cards are selected', () => {
    const cards = [makeCard(), makeCard()];
    const count = clearCardSelection(cards);
    expect(count).toBe(0);
    expect(cards.every((c) => !c.isSelected)).toBe(true);
  });

  it('should return 0 when the cards array is empty', () => {
    const count = clearCardSelection([]);
    expect(count).toBe(0);
  });
});
