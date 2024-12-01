// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderDefinitions = {
  urlPath: `/${string}/`;
  endpoint: string;
  newUrl: (path: string, endpoint: string) => string;
  getSearchRequest?: (searchTerm: string, page: string, platformId?: string) => Promise<Request>
  searchResultNormalization?: (results: unknown[]) => SearchResult[];
  getPlatformLogosRequest?: () => Promise<Request>;
  getCoversRequest?: () => Promise<Request>;
};

type SearchResult = unknown;

export const enum availablePlatforms {
  THEGAMESDB = 'thegamesdb',
  SCREEN_SCRAPER = 'screenscraper',
}

export const apiDefinitions: Record<availablePlatforms, ProviderDefinitions> = {
  [availablePlatforms.THEGAMESDB]: {
    urlPath: '/thegamesdb/',
    endpoint: process.env.ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&apikey=${process.env.APIKEY}`,
    getSearchRequest: async (searchTerm: string, page: string, platformId?: string) => {
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
      return new Request(url);
    }
  },
  [availablePlatforms.SCREEN_SCRAPER]: {
    urlPath: '/screenscraper/',
    endpoint: process.env.SCREENSCRAPER_ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&output=JSON&devid=${process.env.SCREENSCRAPER_USERNAME}&devpassword=${process.env.SCREENSCRAPER_PASSWORD}&softname=zaparoo`,
  },
} as const;