import { getToken } from "./twitchTokenManager.mjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderDefinitions = {
  urlPath: `/${string}/`;
  endpoint: string;
  newUrl: (path: string, endpoint: string) => string;
  getSearchURL?: (searchTerm: string, page: string, platformId?: string) => URL
  searchResultNormalization?: (results: unknown[]) => SearchResult[];
  getPlatformLogosRequest?: () => Promise<Request>;
};

type SearchResult = unknown;

export const enum availablePlatforms {
  THEGAMESDB = 'thegamesdb',
  SCREEN_SCRAPER = 'screenscraper',
  IGDB = 'igdb'
}

export const apiDefinitions: Record<availablePlatforms, ProviderDefinitions> = {
  [availablePlatforms.THEGAMESDB]: {
    urlPath: '/thegamesdb/',
    endpoint: process.env.ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&apikey=${process.env.APIKEY}`,
    getSearchURL: (searchTerm: string, page: string, platformId?: string) => {
      const searchPath = '/v1.1/Games/ByGameName';
      const url = new URL(
        searchPath,
        process.env.ENDPOINT!,
      );
      url.searchParams.append('name', searchTerm);
      url.searchParams.append('fields', 'platform,players,overview,');
      url.searchParams.append('include', 'boxart,platform');
      url.searchParams.append('page', page);
      url.searchParams.append('apikey', process.env.APIKEY!);
      if (platformId) {
        url.searchParams.append('filter[platform]', `${platformId}`);
      }
      return url;
    }
  },
  [availablePlatforms.SCREEN_SCRAPER]: {
    urlPath: '/screenscraper/',
    endpoint: process.env.SCREENSCRAPER_ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&output=JSON&devid=${process.env.SCREENSCRAPER_USERNAME}&devpassword=${process.env.SCREENSCRAPER_PASSWORD}&softname=zaparoo`,
  },
  [availablePlatforms.IGDB]: {
    urlPath: '/igdb/',
    endpoint: process.env.IGDB_ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSearchURL: (searchTerm: string, page: string, platformId?: string) => {
      const searchPath = '/v4/search';
      const url = new URL(
        searchPath,
        process.env.ENDPOINT!,
      );
      return url;
    },
    getPlatformLogosRequest: async () => {
      const path = '/v4/platform_logos';
      const token = await getToken();
      const url = new URL(
        path,
        process.env.IGDB_ENDPOINT!,
      );
      return new Request(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.IGDB_CLIENT_ID!,
          'Authorization': `Bearer ${token}`,
        },
        body: "fields *"
      });
    }
  }
} as const;