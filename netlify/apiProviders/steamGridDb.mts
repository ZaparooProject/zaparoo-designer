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
    const headers = await this.requestHeaders();

    console.log({ url, headers });

    return new Request(url, {
      method: 'GET',
      headers,
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
}
