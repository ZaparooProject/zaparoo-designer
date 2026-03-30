// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchGameList } from './search';

const allPlatform = {
  id: 0,
  name: 'All',
  abbreviation: 'all',
};

describe('fetchGameList', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should return empty results when the search endpoint responds with an error status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{}', { status: 500 })),
    );

    const result = await fetchGameList('mario', allPlatform, '1', false);

    expect(result).toEqual({
      count: 0,
      hasMore: false,
      games: [],
    });
  });

  it('should return empty results when the search endpoint omits results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ count: 12 }), { status: 200 }),
      ),
    );

    const result = await fetchGameList('mario', allPlatform, '1', false);

    expect(result).toEqual({
      count: 12,
      hasMore: false,
      games: [],
    });
  });
});
