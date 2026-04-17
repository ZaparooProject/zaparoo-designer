// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  fetchGameList,
  fetchSteamGridsByGameId,
  fetchSteamLogosByGameId,
} from './search';

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

describe('SteamGridDB search helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should include the requested page when fetching SteamGridDB grids', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          count: 27,
          results: [{ id: '1', name: 'Test', cover: {} }],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSteamGridsByGameId(55, 'Portal', { page: 3 });

    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(
      '/api/steam/grid/55?gameName=Portal&page=3',
    );
    expect(result.count).toBe(27);
    expect(result.games).toHaveLength(1);
  });

  it('should include the requested page when fetching SteamGridDB logos', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          count: 8,
          results: [{ id: '2', name: 'Test', cover: {} }],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSteamLogosByGameId(89, 'Half-Life', {
      page: 2,
    });

    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(
      '/api/steam/logo/89?gameName=Half-Life&page=2',
    );
    expect(result.count).toBe(8);
    expect(result.games).toHaveLength(1);
  });
});
