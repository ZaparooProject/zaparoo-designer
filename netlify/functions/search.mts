import type { Config } from "@netlify/functions"
import { prepareCorsHeaders } from '../data/utils';
import { genericError } from "../utils.mjs";
import { IGBDProvider } from "../apiProviders/igdb.mts";

// search games by name
export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  const parsedUrl = new URL(url);
  const searchParams = parsedUrl.searchParams
  const provider = new IGBDProvider();
  const searchRequest = await provider.getSearchRequest(
    searchParams.get("searchTerm") ?? '',
    searchParams.get("page") ?? '1',
    searchParams.get("platformId") ?? '',
    searchParams.get("romHacks") === '1',
  )
  try {
    const response = await fetch(searchRequest);
    const { status, statusText, headers } = response;
    const data = await response.json();
    const xCount = headers.get("x-count");
    const count = xCount ? parseInt(xCount, 10) : undefined;
    const converted = await provider.convertToSearchResults(data, count);
    const respHeaders = prepareCorsHeaders(req);
    return new Response(JSON.stringify(converted), { status, statusText, headers: respHeaders });
  } catch(e: unknown) {
    console.log(e)
    return genericError();
  }  
}

export const config: Config = {
  path: "/api/search"
};