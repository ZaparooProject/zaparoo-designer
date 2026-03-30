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
  url: URL;
  thumb: URL;
  tags: string[];
  language: string;
  notes: string | null;
  width: number;
  height: number;
  upvotes: number;
  downvotes: number;
}

export class SGDBProvider {
  urlPath = '/igdb/';
  endpoint = process.env.STEAMGRID_DB_BASEURL;

  newUrl(path: string) {
    return `${this.endpoint}${path}`;
  }

  async requestHeaders() {
    const token = await getToken();
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async getSearchRequest(searchTerm: string): Promise<Request> {
    const searchPath = `/search/autocomplete/${encodeURIComponent(searchTerm)}`;
    const url = new URL(searchPath, this.endpoint);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }

  async getGridsByGameId(gameId: string): Promise<Request> {
    const gridsPath = `/grids/game/${gameId}`;
    const url = new URL(gridsPath, this.endpoint);

    return new Request(url, {
      method: 'GET',
      headers: await this.requestHeaders(),
    });
  }
}
