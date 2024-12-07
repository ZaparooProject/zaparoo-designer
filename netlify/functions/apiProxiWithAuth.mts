import type { Config } from "@netlify/functions"
import { apiDefinitions } from '../data/apiProviderDefinitions.mjs';

export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  let response;

  for (const apiDefinition of Object.values(apiDefinitions)) {
    const path = url.split(apiDefinition.urlPath)[1];
    if (!path || response) continue;
    const newUrl = apiDefinition.newUrl(path, apiDefinition.endpoint);
    const { body, status, statusText } = await fetch(newUrl);
    const origin = req.headers.get('Origin') ?? '';
    const respHeaders = {};
    if (origin.includes('//localhost') || origin.includes('//deploy-preview')) {
      respHeaders['Access-Control-Allow-Origin'] = origin;
      respHeaders['Cache-Control'] = 'max-age=86400';
    }
    response = new Response(body, { status, statusText, headers: respHeaders });
  }

  return response;
}

export const config: Config = {
  path: "/thegamesdb/*"
};