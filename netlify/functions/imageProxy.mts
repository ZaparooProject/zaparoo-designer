import type { Config } from "@netlify/functions"

const supportedDestinations = ['cdn.thegamesdb.net', 'images.igdb.com'];

export default async (req: Request /* , context: Context */): Promise<Response> => {
  const { url } = req;
  const parsedUrl = new URL(url);
  const destination = parsedUrl.searchParams.get('imageUrl');
  if (destination) {
    const pasedDestination = new URL(destination);
    const host = pasedDestination.host;
    if (supportedDestinations.includes(host)) {
      const origin = req.headers.get('Origin') ?? '';
      const respHeaders = {};
      if (origin.includes('//localhost') || origin.includes('//deploy-preview')) {
        respHeaders['Access-Control-Allow-Origin'] = origin;
        respHeaders['Cache-Control'] = 'Netlify-CDN-Cache-Control: public, max-age=86400';
      }
      const { body, status, statusText } = await fetch(destination);
      return new Response(body, { status, statusText, headers: respHeaders });
    }
  }
  return new Response(null, { status: 403 });
}

export const config: Config = {
  path: "/imageProxy"
};