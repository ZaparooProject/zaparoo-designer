import { BaseProvider } from "./baseProvider.mjs";
import { getToken } from "./twitchTokenManager.mjs";
import { type SearchResults } from "./types.mts";

type IGDBImage = {
  url: string;
  id: string;
  alpha_channel: boolean;
};

type Platform = {

}

type ApiGamesResult = {
  id: string;
  artworks: IGDBImage[];
  screenshots: IGDBImage[];
  cover: IGDBImage;
  summary: string;
  name: string;
  platforms: Platform[];
}

export class IGBDProvider extends BaseProvider<ApiGamesResult> {

  urlPath = '/igdb/';
  endpoint = process.env.IGDB_ENDPOINT;

  newUrl(path) {
    return `${this.endpoint}${path}`;
  }

  async requestHeaders() {
    const token = await getToken();
    return {
      'Accept': 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID!,
      'Authorization': `Bearer ${token}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSearchRequest(searchTerm: string, page: string, platformId?: string): Promise<Request> {
    const searchPath = '/v4/games';
    const url = new URL(
      searchPath,
      this.endpoint,
    );
    const pageSize = 50;
    const offSet = (parseInt(page, 10) - 1) * pageSize;
    return new Request(url, {
      method: 'POST',
      headers: await this.requestHeaders(),
      // parent = null excludes duplicates of versions
      // company involved != null probably excludes romhacks
      body: `fields id,artworks,cover,genres,name,platforms,screenshots,storyline,summary,artworks.*,cover.*,screenshots.*,platforms.*, platforms.platform_logo.*; search "${searchTerm}"; where version_parent = null & involved_companies != null & artworks.animated = false; limit ${pageSize}; offset ${offSet};`,
    });
  }

  async convertToSearchResults(data: ApiGamesResult[]) {
    return data as unknown as SearchResults;
  }

  async getPlatformLogosRequest(): Promise<Request> {
    const path = '/v4/platform_logos';
    const url = new URL(
      path,
      this.endpoint,
    );
    return new Request(url, {
      method: 'POST',
      headers: await this.requestHeaders(),
      body: "fields *; limit 200;"
    });
  }
}