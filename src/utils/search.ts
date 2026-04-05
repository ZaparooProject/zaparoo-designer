import { PlatformResult } from '../../netlify/apiProviders/types.mts';
import type {
  SearchResults,
  SearchResult,
} from '../../netlify/apiProviders/types.mjs';
import { SEARCH_PAGESIZE } from '../../netlify/apiProviders/constants.mts';

const SEARCH_ENDPOINT = '/api/search';
const STEAM_AUTOCOMPLETE_ENDPOINT = '/api/steam/autocomplete';
const STEAM_GRID_GAME_ENDPOINT = '/api/steam/grid';
const STEAM_LOGO_GAME_ENDPOINT = '/api/steam/logo';

export let platformsData: PlatformResult[] = [];
export type SteamAutocompleteGame = {
  id: number;
  name: string;
};

export type ResultsForSearchUI = {
  games: SearchResult[];
  hasMore: boolean;
  count: number;
};

type SteamAssetFetchOptions = {
  page?: number;
  signal?: AbortSignal;
};

export const platformPromise = import(
  '../../netlify/data/IGDBPlatforms.mts'
).then((data) => {
  const allPlatform = { id: 0, name: 'All', abbreviation: 'all', versions: [] };
  const platforms = data.platforms.results.filter((p) => p.popular === true);
  platforms.unshift(allPlatform);
  platformsData = platforms;
  return {
    count: data.platforms.count,
    platforms: platformsData,
  };
});

export async function fetchGameList(
  query: string,
  platform: PlatformResult,
  page: string,
  romHacks = false,
): Promise<ResultsForSearchUI> {
  const url = getGoodUrl(SEARCH_ENDPOINT);
  url.searchParams.append('searchTerm', query);
  url.searchParams.append('page', page);
  if (platform.id !== 0) {
    url.searchParams.append('platformId', `${platform.id}`);
  }
  if (romHacks) {
    url.searchParams.append('romHacks', '1');
  }
  return fetch(url, {
    mode: 'cors',
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Search request failed with status ${res.status}`);
      }
      const data = (await res.json()) as Partial<SearchResults>;
      const results = Array.isArray(data.results) ? data.results : [];
      const count = typeof data.count === 'number' ? data.count : 0;
      await platformPromise;
      return {
        count,
        hasMore: count / SEARCH_PAGESIZE > parseInt(page, 10) ? true : false,
        games: results,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        count: 0,
        hasMore: false,
        games: [] as SearchResult[],
      };
    });
}

export async function fetchSteamAutocomplete(
  query: string,
  signal?: AbortSignal,
): Promise<SteamAutocompleteGame[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const url = getGoodUrl(STEAM_AUTOCOMPLETE_ENDPOINT);
  url.searchParams.append('searchTerm', trimmedQuery);

  return fetch(url, {
    mode: 'cors',
    signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(
          `Steam autocomplete request failed with status ${res.status}`,
        );
      }

      const data = (await res.json()) as unknown;
      return Array.isArray(data)
        ? data.filter((item): item is SteamAutocompleteGame => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof item.id === 'number' &&
              typeof item.name === 'string'
            );
          })
        : [];
    })
    .catch((err) => {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return [];
      }

      console.error(err);
      return [];
    });
}

export async function fetchSteamGridsByGameId(
  gameId: number,
  gameName: string,
  { page = 0, signal }: SteamAssetFetchOptions = {},
): Promise<ResultsForSearchUI> {
  const url = getGoodUrl(`${STEAM_GRID_GAME_ENDPOINT}/${gameId}`);
  url.searchParams.append('gameName', gameName);
  url.searchParams.append('page', `${page}`);

  return fetch(url, {
    mode: 'cors',
    signal,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(
        `Steam grids request failed with status ${res.status} for game ${gameId}`,
      );
    }

    const data = (await res.json()) as Partial<SearchResults>;
    const results = Array.isArray(data.results) ? data.results : [];
    const count = typeof data.count === 'number' ? data.count : results.length;

    return {
      count,
      hasMore: results.length > 0 && count > (page + 1) * 50,
      games: results,
    };
  });
}

export async function fetchSteamLogosByGameId(
  gameId: number,
  gameName: string,
  { page = 0, signal }: SteamAssetFetchOptions = {},
): Promise<ResultsForSearchUI> {
  const url = getGoodUrl(`${STEAM_LOGO_GAME_ENDPOINT}/${gameId}`);
  url.searchParams.append('gameName', gameName);
  url.searchParams.append('page', `${page}`);

  return fetch(url, {
    mode: 'cors',
    signal,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(
        `Steam logos request failed with status ${res.status} for game ${gameId}`,
      );
    }

    const data = (await res.json()) as Partial<SearchResults>;
    const results = Array.isArray(data.results) ? data.results : [];
    const count = typeof data.count === 'number' ? data.count : results.length;

    return {
      count,
      hasMore: results.length > 0 && count > (page + 1) * 50,
      games: results,
    };
  });
}

const getGoodUrl = (relativeUrl: string): URL => {
  const host = window.location.hostname;
  // let fqdn = 'https://design.zaparoo.org';
  let fqdn = 'https://deploy-preview-173--zaparoo-designer.netlify.app/';
  if (host.includes('netlify') || host.includes('design.zaparoo.org')) {
    fqdn = `${window.location.protocol}//${window.location.hostname}`;
  }
  const url = new URL(relativeUrl, fqdn);
  return url;
};

export const createProxyUrl = (cdnUrl: string): URL => {
  const url = getGoodUrl('/imageProxy/');
  url.searchParams.append('imageUrl', `${cdnUrl}`);
  return url;
};

export async function getImage(
  cdnUrl: string,
  previousUrl: string,
): Promise<File> {
  return fetch(createProxyUrl(cdnUrl))
    .then((r) => r.blob())
    .then((blob) => new File([blob], previousUrl, { type: blob.type }));
}
