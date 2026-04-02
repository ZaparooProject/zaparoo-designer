import type { Config, Context } from '@netlify/functions';
import {
  convertLogosToSearchResults,
  SGDBProvider,
} from '../apiProviders/steamGridDb.mts';
import { prepareCorsHeaders } from '../data/utils';

export default async (req: Request, context: Context): Promise<Response> => {
  const gameId = context.params.gameId?.trim() ?? '';
  const gameName = new URL(req.url).searchParams.get('gameName')?.trim() ?? '';
  const respHeaders = prepareCorsHeaders(req);

  if (!gameId) {
    return new Response(
      JSON.stringify({ error: 'Missing gameId path param' }),
      {
        status: 400,
        headers: respHeaders,
      },
    );
  }

  const provider = new SGDBProvider();
  const request = await provider.getLogosByGameId(gameId, {
    style: ['official', 'white', 'black', 'custom'],
  });

  try {
    const response = await fetch(request);
    const data = await response.json();
    const converted = convertLogosToSearchResults(data, gameName || undefined);

    return new Response(JSON.stringify(converted), {
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
  path: '/api/steam/logo/:gameId',
};
