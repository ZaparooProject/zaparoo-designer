// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderDefinitions = any;

export const apiDefinitions: Record<string, ProviderDefinitions> = {
  thegamesdb: {
    urlPath: '/thegamesdb/',
    endpoint: process.env.ENDPOINT,
    newUrl: (path, endpoint) => `${endpoint}${path}&apikey=${process.env.APIKEY}`,
  },
  screenscraper: {
    urlPath: '/screenscraper/',
    endpoint: process.env.SCREENSCRAPER_ENDPOINT,
    newUrl: (path, endpoint) => `${endpoint}${path}&output=JSON&devid=${process.env.SCREENSCRAPER_USERNAME}&devpassword=${process.env.SCREENSCRAPER_PASSWORD}&softname=zaparoo`,
  }
} as const;