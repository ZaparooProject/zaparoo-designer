import type { Config, Context } from '@netlify/functions';
import {
  convertGridsToSearchResults,
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
  const request = await provider.getGridsByGameId(gameId, {
    dimensions: ['600x900', '1024x1024', '920x430'],
    styles: ['no_logo', 'white_logo', 'material', 'alternate'],
  });

  try {
    const response = await fetch(request);
    const data = await response.json();
    const converted = convertGridsToSearchResults(data, gameName || undefined);

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
  path: '/api/steam/grid/:gameId',
};
