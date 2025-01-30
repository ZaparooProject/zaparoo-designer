
export const prepareCorsHeaders = (req: Request): Record<string, string> => {
  const origin = req.headers.get('Origin') ?? '';
  const respHeaders = {};
  if (origin.includes('//localhost') || origin.includes('//deploy-preview')) {
    respHeaders['Access-Control-Allow-Origin'] = origin;
    respHeaders['Cache-Control'] = 'max-age=86400';
  }
  return respHeaders;
}