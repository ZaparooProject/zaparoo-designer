import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CardData } from '../../contexts/fileDropper';
import {
  applySearchResultToCards,
  getActiveResultTargetIndex,
  hasUserImageLayers,
} from './searchResultActions';

vi.mock('../../utils/search', () => ({
  getImage: vi.fn().mockResolvedValue(null),
}));
vi.mock('../../hooks/useLabelEditor', () => ({
  setMainImageOnCanvas: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../utils/setTemplateV2', () => ({
  scaleImageToOverlayArea: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../utils/templateHandling', () => ({
  getMainImage: vi.fn().mockReturnValue(null),
  getPlaceholderMain: vi.fn().mockReturnValue(null),
}));

const makeCard = (isSelected = false): CardData => ({
  file: null,
  game: {},
  isSelected,
  colors: [],
  originalColors: [],
  key: Math.random().toString(36),
});

describe('getActiveResultTargetIndex', () => {
  it('should return the editing card index when an editing card is active', () => {
    const cards = [makeCard(), makeCard(true), makeCard()];

    expect(getActiveResultTargetIndex(cards, cards[2])).toBe(2);
  });

  it('should return the first selected card when there is no editing card', () => {
    const cards = [makeCard(false), makeCard(true), makeCard(true)];

    expect(getActiveResultTargetIndex(cards, null)).toBe(1);
  });

  it('should fall back to the first selected card when the editing card is stale', () => {
    const cards = [makeCard(false), makeCard(true), makeCard(false)];
    const staleEditingCard = makeCard(false);

    expect(getActiveResultTargetIndex(cards, staleEditingCard)).toBe(1);
  });

  it('should return -1 when there is no editing card or selected card', () => {
    const cards = [makeCard(false), makeCard(false)];

    expect(getActiveResultTargetIndex(cards, null)).toBe(-1);
  });
});

describe('applySearchResultToCards', () => {
  const game = {
    id: '1',
    name: 'Test Game',
    summary: '',
    storyline: '',
    cover: {
      id: 1,
      image_id: '1',
      url: 'https://example.com/full.png',
      thumb: 'https://example.com/thumb.png',
      width: 100,
      height: 100,
    },
    artworks: [],
    screenshots: [],
    involved_companies: [],
    extra_images: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call onSelectGame when applying to the editing card', async () => {
    const cards = [makeCard(false), makeCard(false)];
    const onSelectGame = vi.fn();
    const swapGameAtIndex = vi.fn();

    await applySearchResultToCards({
      addFiles: vi.fn(),
      cards,
      editingCard: cards[1],
      game,
      onSelectGame,
      previewSrc: game.cover.thumb,
      swapGameAtIndex,
      url: game.cover.url,
    });

    expect(swapGameAtIndex).toHaveBeenCalledWith(null, game, 1);
    expect(onSelectGame).toHaveBeenCalledTimes(1);
  });

  it('should not call onSelectGame when applying to a selected card', async () => {
    const cards = [makeCard(false), makeCard(true)];
    const onSelectGame = vi.fn();
    const swapGameAtIndex = vi.fn();

    await applySearchResultToCards({
      addFiles: vi.fn(),
      cards,
      editingCard: null,
      game,
      onSelectGame,
      previewSrc: game.cover.thumb,
      swapGameAtIndex,
      url: game.cover.url,
    });

    expect(swapGameAtIndex).toHaveBeenCalledWith(null, game, 1);
    expect(onSelectGame).not.toHaveBeenCalled();
  });
});

describe('hasUserImageLayers', () => {
  it('should return false when the card has no canvas', () => {
    expect(hasUserImageLayers(makeCard(false))).toBe(false);
  });

  it('should return false when the canvas has no user layers', () => {
    const card = makeCard(false);
    card.canvas = {
      getObjects: () => [{}, { resourceType: 'main' }],
    } as unknown as CardData['canvas'];

    expect(hasUserImageLayers(card)).toBe(false);
  });

  it('should return true when the canvas contains a user layer', () => {
    const card = makeCard(false);
    card.canvas = {
      getObjects: () => [{ 'zaparoo-user-layer': true }],
    } as unknown as CardData['canvas'];

    expect(hasUserImageLayers(card)).toBe(true);
  });
});
