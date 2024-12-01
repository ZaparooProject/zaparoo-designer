import type { Config } from "@netlify/functions"
import { prepareCorsHeaders } from '../data/utils';
import { apiDefinitions, availablePlatforms } from '../data/apiProviderDefinitions.mjs';
import { genericError } from "../utils.mts";

const COVERS_PLATFORM: availablePlatforms = availablePlatforms.IGDB

// search games by name
export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { getCoversRequest } = apiDefinitions[COVERS_PLATFORM];
  if (!getCoversRequest) {
    return genericError();
  }
  const request = await getCoversRequest();
  try {
    const { body, status, statusText } = await fetch(request);
    const respHeaders = prepareCorsHeaders(req);
    return new Response(body, { status, statusText, headers: respHeaders });
  } catch(e: unknown) {
    console.log(e)
    return genericError();
  }  
}

export const config: Config = {
  path: "/api/covers"
};