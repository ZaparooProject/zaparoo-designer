import type { Config } from "@netlify/functions"
import { prepareCorsHeaders } from '../data/utils';
import { apiDefinitions, availablePlatforms } from '../data/apiProviderDefinitions.mjs';

const LOGOS_PLATFORM: availablePlatforms = availablePlatforms.IGDB

// search games by name
export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { getCoversRequest } = apiDefinitions[LOGOS_PLATFORM];
  if (!getCoversRequest) {
    return new Response('{}', { status: 500, statusText: 'error' });
  }
  const request = await getCoversRequest();
  try {
    const { body, status, statusText } = await fetch(request);
    const respHeaders = prepareCorsHeaders(req);
    return new Response(body, { status, statusText, headers: respHeaders });
  } catch(e: unknown) {
    console.log(e)
    return new Response('{}', { status: 500, statusText: 'error' });
  }  
}

export const config: Config = {
  path: "/api/covers"
};