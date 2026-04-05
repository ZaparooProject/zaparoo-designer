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
  data: SGDBImage[];
  total: number;
  page: number;
};

export type SGDBLogoData = {
  data: SGDBImage[];
  total: number;
  page: number;
};

export type SGDBGridStyle =
  | 'alternate'
  | 'blurred'
  | 'white_logo'
  | 'material'
  | 'no_logo';

export type SGDBGridDimension =
  | '460x215'
  | '920x430'
  | '600x900'
  | '342x482'
  | '660x930'
  | '512x512'
  | '1024x1024';

export type SGDBGridQueryOptions = {
  styles?: SGDBGridStyle[];
  dimensions?: SGDBGridDimension[];
  page?: number;
};

export type SGDBLogoStyle = 'official' | 'white' | 'black' | 'custom';

export type SGDBLogoQueryOptions = {
  style?: SGDBLogoStyle[];
  page?: number;
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
  const { total } = data;

  return {
    count: total,
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

const setArraySearchParam = (url: URL, key: string, values?: string[]) => {
  const filteredValues = values?.filter(Boolean);

  if (filteredValues && filteredValues.length > 0) {
    url.searchParams.set(key, filteredValues.join(','));
  }
};

const setNumberSearchParam = (url: URL, key: string, value?: number) => {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    url.searchParams.set(key, `${value}`);
  }
};

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

  async getGridsByGameId(
    gameId: string,
    options: SGDBGridQueryOptions = {},
  ): Promise<Request> {
    const gridsPath = `/api/v2/grids/game/${gameId}`;
    const url = new URL(gridsPath, this.endpoint);
    setArraySearchParam(url, 'styles', options.styles);
    setArraySearchParam(url, 'dimensions', options.dimensions);
    setNumberSearchParam(url, 'page', options.page);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }

  async getLogosByGameId(
    gameId: string,
    options: SGDBLogoQueryOptions = {},
  ): Promise<Request> {
    const logosPath = `/api/v2/logos/game/${gameId}`;
    const url = new URL(logosPath, this.endpoint);
    setArraySearchParam(url, 'style', options.style);
    setNumberSearchParam(url, 'page', options.page);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }
}
