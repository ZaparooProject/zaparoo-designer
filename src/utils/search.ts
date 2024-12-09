import { PlatformResult } from '../../netlify/apiProviders/types.mts';
import type { SearchResults, SearchResult } from '../../netlify/apiProviders/types.mjs';
import { SEARCH_PAGESIZE } from '../../netlify/apiProviders/constants.mts';

const SEARCH_ENDPOINT = '/api/search';

export let platformsData: PlatformResult[] = [];

export type ResultsForSearchUI = {
  games: SearchResult[];
  hasMore: boolean;
  count: number;
}

export const platformPromise = import('../../netlify/data/IGDBPlatforms.mts').then((data) => {
  const allPlatform = { id: 0, name: 'All', abbreviation: 'all', versions: [] };
  const platforms = data.platforms.results.filter((p) => p.popular === true);
  platforms.unshift(allPlatform)
  platformsData = platforms;
  return {
    count: data.platforms.count,
    platforms: platformsData,
  };
});

export async function fetchGameList(
  query: string,
  platform: PlatformResult,
  page: string,
  romHacks = false,
): Promise<ResultsForSearchUI> {
  const url = getGoodUrl(SEARCH_ENDPOINT);
  url.searchParams.append('searchTerm', query);
  url.searchParams.append('page', page);
  if (platform.id !== 0) {
    url.searchParams.append('platformId', `${platform.id}`);
  }
  if (romHacks) {
    url.searchParams.append('romHacks', '1')
  }
  return (
    fetch(url, {
      mode: 'cors',
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res) => res.json() as Promise<SearchResults>)
      .then(async ({ results, count }) => {
          await platformPromise;
          return {
            count,
            hasMore: (count / SEARCH_PAGESIZE) > parseInt(page, 10) ? true : false,
            games: results,
          };
      })
      .catch((err) => {
        console.error(err);
        return {
          count: 0,
          hasMore: false,
          games: [] as SearchResult[],
        };
      })
  );
}

const getGoodUrl = (relativeUrl: string): URL => {
  const host = window.location.hostname;
  let fqdn = 'https://design.zaparoo.org';
  // let fqdn = 'https://deploy-preview-75--zaparoo-designer.netlify.app/';
  if (host.includes('netlify') || host.includes('design.zaparoo.org')) {
    fqdn = `${window.location.protocol}//${window.location.hostname}`;
  } 
  const url = new URL(
    relativeUrl,
    fqdn,
  );
  return url;
}

export async function getImage(cdnUrl: string, previousUrl: string): Promise<File> {
  const url = getGoodUrl('/imageProxy/');
  url.searchParams.append('imageUrl', `${cdnUrl}`);
  return fetch(url)
    .then((r) => r.blob())
    .then((blob) => new File([blob], previousUrl, { type: blob.type }));
}