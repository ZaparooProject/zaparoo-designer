import { Platform } from '../../netlify/data/gamesDbPlatforms';

const SEARCH_ENDPOINT = '/api/search';
const GAMESDB_IMAGE_ENDPOINT = '/thegamesdb/v1/Games/Images';

export interface ImageSearchResult {
  imageUrl: string;
  thumbnailUrl: string;
}

interface ApiGameEntry {
  id: number;
  game_title: string;
  platform: number;
  players: number;
  overview?: string;
  coop: string;
  boxart?: string;
}

export interface GameEntry {
  id: number;
  gameTitle: string;
  platform?: Platform;
  players: number;
  overview?: string;
  coop: string;
  boxart: string;
}

export type GameListData = {
  games: GameEntry[];
  moreLink: string;
};

export type GameImagesData = {
  images: ImageSearchResult[];
};

export let platformsData: Platform[] = [];

export const platformPromise = import('../../netlify/data/gamesDbPlatforms').then((data) => {
  const allPlatform = data.platforms['0'];
  const sortedValues = Object.values(data.platforms).slice(1).sort((valueA, valueB) => {
    return valueA.name > valueB.name ? 1 : -1;
  });
  sortedValues.unshift(allPlatform);
  platformsData = sortedValues;
  return {
    count: data.count,
    platforms: sortedValues,
  };
});

export async function fetchGameList(
  query: string,
  platform: Platform,
  page: string,
): Promise<GameListData> {
  const url = getGoodUrl(SEARCH_ENDPOINT);
  url.searchParams.append('searchTerm', query);
  url.searchParams.append('page', page);
  if (platform.id !== 0) {
    url.searchParams.append('platformId', `${platform.id}`);
  }
  return (
    fetch(url, {
      mode: 'cors',
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res) => res.json() as Promise<any>)
      .then(async ({ data, pages, code, include }) => {
        if (code === 200 && data.count > 0) {
          await platformPromise;
          const { base_url, data: boxArts } = include.boxart;
          return {
            games: (data.games as ApiGameEntry[]).map<GameEntry>(
              ({
                game_title: gameTitle,
                platform,
                players,
                coop,
                overview,
                id,
              }: ApiGameEntry) => ({
                gameTitle,
                platform: platformsData.find(p => p.id === platform),
                id,
                coop,
                players,
                overview,
                boxart: boxArts[id] ? `${base_url.large}${boxArts[id][0].filename}` : '',
              }),
            ),
            moreLink: pages.next
              ? pages.next.replace('https://api.thegamesdb.net/', '')
              : '',
          };
        } else {
          return {
            moreLink: '',
            games: [] as GameEntry[],
          };
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          moreLink: '',
          games: [] as GameEntry[],
        };
      })
  );
}

const getGoodUrl = (relativeUrl: string): URL => {
  const host = window.location.hostname;
  let fqdn = 'https://tapto-designer.netlify.app';
  if (host.includes('netlify') || host.includes('tapto') || host.includes('design.zaparoo.org')) {
    fqdn = `${window.location.protocol}//${window.location.hostname}`;
  } 
  const url = new URL(
    relativeUrl,
    fqdn,
  );
  return url;
}

export async function fetchGameImages(gameId: number): Promise<GameImagesData> {
  const url = getGoodUrl(GAMESDB_IMAGE_ENDPOINT);
  url.searchParams.append('games_id', `${gameId}`);
  url.searchParams.append(
    'filter[type]',
    'fanart,banner,boxart,screenshot,clearlogo,titlescreen',
  );
  return (
    fetch(url, {
      mode: 'cors',
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res) => res.json() as Promise<any>)
      .then(({ data, code }) => {
        if (code === 200) {
          const { base_url, images } = data;
          const pictures = images[gameId];
          return {
            images: pictures.map((picture: any) => ({
              imageUrl: `${base_url.original}${picture.filename}`,
              thumbnailUrl: `${base_url.medium}${picture.filename}`,
            })),
          };
        } else {
          return {
            images: [] as ImageSearchResult[],
          };
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          images: [] as ImageSearchResult[],
        };
      })
  );
}

export async function getImage(cdnUrl: string, previousUrl: string): Promise<File> {
  const url = getGoodUrl('/imageProxy/');
  url.searchParams.append('imageUrl', `${cdnUrl}`);
  return fetch(url)
    .then((r) => r.blob())
    .then((blob) => new File([blob], previousUrl, { type: blob.type }));
}