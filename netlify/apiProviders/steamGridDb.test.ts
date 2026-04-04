import { describe, expect, it } from 'vitest';
import {
  convertGridsToSearchResults,
  convertLogosToSearchResults,
} from './steamGridDb.mts';

const baseImage = {
  id: 10,
  score: 42,
  style: ['official'],
  url: 'https://cdn.example.com/image.png',
  thumb: 'https://cdn.example.com/thumb.png',
  tags: [],
  language: 'en',
  notes: null,
  width: 600,
  height: 900,
  upvotes: 1,
  downvotes: 0,
};

describe('convertGridsToSearchResults', () => {
  it('should use the SteamGridDB total when pagination metadata is present', () => {
    const result = convertGridsToSearchResults({
      data: [baseImage],
      total: 27,
    });

    expect(result.count).toBe(27);
    expect(result.results).toHaveLength(1);
  });
});

describe('convertLogosToSearchResults', () => {
  it('should fall back to the current page length when total is missing', () => {
    const result = convertLogosToSearchResults({
      data: [baseImage, { ...baseImage, id: 11 }],
    });

    expect(result.count).toBe(2);
    expect(result.results).toHaveLength(2);
  });
});
