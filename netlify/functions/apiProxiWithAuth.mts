import type { Config } from "@netlify/functions"

const apiDefinitions = {
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

export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  let response;

  Object.values(apiDefinitions).forEach(async (apiDefinition) => {
    const path = url.split(apiDefinition.urlPath)[1];
    if (!path || response) return;
    const newUrl = apiDefinition.newUrl(path, apiDefinition.endpoint);
    const { body, status, statusText } = await fetch(newUrl);
    const origin = req.headers.get('Origin') ?? '';
    const respHeaders = {};
    if (origin.includes('//localhost') || origin.includes('//deploy-preview')) {
      respHeaders['Access-Control-Allow-Origin'] = origin;
      respHeaders['Cache-Control'] = 'max-age=86400';
    }
    response = new Response(body, { status, statusText, headers: respHeaders });
  });

  return response;
}

export const config: Config = {
  path: Object.values(apiDefinitions).map(value => `${value.urlPath}*`) as unknown as `/${string}`,
};