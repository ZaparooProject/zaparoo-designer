// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderDefinitions = {
  searchPath: string;
  urlPath: `/${string}/`;
  endpoint: string;
  newUrl: (path: string, endpoint: string) => string;
};

export const apiDefinitions: Record<string, ProviderDefinitions> = {
  thegamesdb: {
    urlPath: '/thegamesdb/',
    endpoint: process.env.ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&apikey=${process.env.APIKEY}`,
    searchPath: '',
  },
  screenscraper: {
    urlPath: '/screenscraper/',
    endpoint: process.env.SCREENSCRAPER_ENDPOINT!,
    newUrl: (path, endpoint) => `${endpoint}${path}&output=JSON&devid=${process.env.SCREENSCRAPER_USERNAME}&devpassword=${process.env.SCREENSCRAPER_PASSWORD}&softname=zaparoo`,
    searchPath: '',
  }
} as const;