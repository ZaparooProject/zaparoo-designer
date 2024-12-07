import type { Config } from "@netlify/functions"
import { prepareCorsHeaders } from '../data/utils';
import { genericError } from "../utils.mjs";
import { IGBDProvider } from "../apiProviders/igdb.mts";

// search games by name
export default async (req: Request /* , context: Context */): Promise<Response> => {
  const provider = new IGBDProvider();
  const request = await provider.getCompaniesRequest();
  try {

    const response = await fetch(request);
    const { status, statusText } = response;
    const data = await response.json();
    const converted = await provider.converToCompaniesResults(data);
    const respHeaders = prepareCorsHeaders(req);
    return new Response(JSON.stringify(converted), { status, statusText, headers: respHeaders });
  } catch(e: unknown) {
    console.log(e)
    return genericError();
  }  
}

export const config: Config = {
  path: "/api/companies"
};