import type { Config } from '@netlify/functions';
import { SGDBProvider } from '../apiProviders/steamGridDb.mts';
import { prepareCorsHeaders } from '../data/utils';

type SteamAutocompleteResult = {
  id: number;
  name: string;
};

type SteamAutocompleteResponse = {
  data?: SteamAutocompleteResult[];
};

// Search SteamGridDB games for autocomplete suggestions.
export default async (req: Request): Promise<Response> => {
  const parsedUrl = new URL(req.url);
  const searchTerm = parsedUrl.searchParams.get('searchTerm')?.trim() ?? '';
  const respHeaders = prepareCorsHeaders(req);

  if (!searchTerm) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: respHeaders,
    });
  }

  const provider = new SGDBProvider();
  const searchRequest = await provider.getSearchRequest(searchTerm);

  try {
    const response = await fetch(searchRequest);
    const data = (await response.json()) as SteamAutocompleteResponse;
    console.log(data);
    const results = Array.isArray(data.data)
      ? data.data.map(({ id, name }) => ({ id, name }))
      : [];

    return new Response(JSON.stringify(results), {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders,
    });
  } catch (e: unknown) {
    console.log(e);
    return new Response('{}', {
      status: 500,
      statusText: 'error',
      headers: respHeaders,
    });
  }
};

export const config: Config = {
  path: '/api/steam/autocomplete',
};
