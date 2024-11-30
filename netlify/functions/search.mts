import type { Config } from "@netlify/functions"
import { apiDefinitions } from '../data/apiProviderDefinitions.mjs';

export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  let response;



  return response;
}

export const config: Config = {
  path: ["/api/search"]
};