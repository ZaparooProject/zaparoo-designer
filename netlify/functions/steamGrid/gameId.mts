import type { Config, Context } from '@netlify/functions';
import { SGDBProvider } from '../../apiProviders/steamGridDb.mts';
import { prepareCorsHeaders } from '../../data/utils';
import { genericError } from '../../utils.mjs';

export default async (
  req: Request,
  context: Context,
): Promise<Response> => {
  const gameId = context.params.gameId?.trim() ?? '';
  const respHeaders = prepareCorsHeaders(req);

  if (!gameId) {
    return new Response(JSON.stringify({ error: 'Missing gameId path param' }), {
      status: 400,
      headers: respHeaders,
    });
  }

  const provider = new SGDBProvider();
  const request = await provider.getGridsByGameId(gameId);

  try {
    const response = await fetch(request);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders,
    });
  } catch (e: unknown) {
    console.log(e);
    return genericError();
  }
};

export const config: Config = {
  path: '/api/steamGrid/:gameId',
};
