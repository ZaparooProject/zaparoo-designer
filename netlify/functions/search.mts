import type { Config } from "@netlify/functions"
import { prepareCorsHeaders } from '../data/utils';
import { apiDefinitions, availablePlatforms } from '../data/apiProviderDefinitions.mjs';
import { genericError } from "../utils.mjs";

const SEARCH_PLATFORM: availablePlatforms = availablePlatforms.IGDB

// search games by name
export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  const parsedUrl = new URL(url);
  const searchParams = parsedUrl.searchParams
  const { getSearchRequest } = apiDefinitions[SEARCH_PLATFORM];
  if (!getSearchRequest) {
    return genericError();
  }
  const searchRquest = await getSearchRequest(
    searchParams.get("searchTerm") ?? "",
    searchParams.get("page") ?? "1",
    searchParams.get("platformId") ?? "",
  )
  try {
    const { body, status, statusText } = await fetch(searchRquest);
    const respHeaders = prepareCorsHeaders(req);
    return new Response(body, { status, statusText, headers: respHeaders });
  } catch(e: unknown) {
    console.log(e)
    return genericError();
  }  
}

export const config: Config = {
  path: "/api/search"
};