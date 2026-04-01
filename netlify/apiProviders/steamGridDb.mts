import type { ResultImage, SearchResult, SearchResults } from './types.mts';
import { getToken } from './steamTokenManager.mjs';

export type SGDBSearchResult = {
  id: number;
  name: string;
  types: string[];
  verified: boolean;
  release_date: number;
};

export type SGDBSearchResultData = {
  data: SGDBSearchResult[];
};

export interface SGDBImage {
  id: number;
  score: number;
  style: string[];
  url: string;
  thumb?: string;
  tags: string[];
  language: string;
  notes: string | null;
  width: number;
  height: number;
  upvotes: number;
  downvotes: number;
}

export type SGDBGridData = {
  data?: SGDBImage[];
};

export type SGDBLogoData = {
  data?: SGDBImage[];
};

const toResultImage = (image: SGDBImage): ResultImage => ({
  id: image.id,
  image_id: `${image.id}`,
  url: image.url,
  thumb: image.thumb ?? image.url,
  width: image.width ?? 0,
  height: image.height ?? 0,
});

const convertAssetsToSearchResults = (
  data: SGDBGridData,
  gameName = 'SteamGridDB',
): SearchResults => {
  const grids = Array.isArray(data.data) ? data.data : [];

  return {
    count: grids.length,
    results: grids.map((grid): SearchResult => {
      const cover = toResultImage(grid);
      const summaryBits = [
        Array.isArray(grid.style) && grid.style.length > 0
          ? grid.style.join(', ')
          : null,
        grid.language && grid.language !== 'none' ? grid.language : null,
        typeof grid.score === 'number' ? `score ${grid.score}` : null,
        grid.notes ?? null,
      ].filter(Boolean);

      return {
        id: `${grid.id}`,
        name: gameName,
        summary: summaryBits.join(' · '),
        storyline: '',
        cover,
        artworks: [cover],
        screenshots: [],
        involved_companies: [],
        extra_images: 0,
      };
    }),
  };
};

export const convertGridsToSearchResults = (
  data: SGDBGridData,
  gameName = 'SteamGridDB',
): SearchResults => convertAssetsToSearchResults(data, gameName);

export const convertLogosToSearchResults = (
  data: SGDBLogoData,
  gameName = 'SteamGridDB',
): SearchResults => convertAssetsToSearchResults(data, gameName);

export class SGDBProvider {
  endpoint = process.env.STEAMGRID_DB_BASEURL;

  async requestHeaders() {
    const token = await getToken();
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async getSearchRequest(searchTerm: string): Promise<Request> {
    const searchPath = `/api/v2/search/autocomplete/${encodeURIComponent(
      searchTerm,
    )}`;
    const url = new URL(searchPath, this.endpoint);
    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }

  async getGridsByGameId(gameId: string): Promise<Request> {
    const gridsPath = `/api/v2/grids/game/${gameId}`;
    const url = new URL(gridsPath, this.endpoint);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }

  async getLogosByGameId(gameId: string): Promise<Request> {
    const logosPath = `/api/v2/logos/game/${gameId}`;
    const url = new URL(logosPath, this.endpoint);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }
}
