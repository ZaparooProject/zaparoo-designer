import { BaseProvider } from "./baseProvider.mjs";
import { type SearchResult, type SearchResults } from "./types.mts";

type IGDBImage = {
  url: string;
  id: string;
  image_id: string;
};

type Platform = {
  abbreviation: string;
  name: string;
  platform_logo?: IGDBImage;
}

type IGDBGamesResult = {
  id: string;
  artworks: IGDBImage[];
  screenshots: IGDBImage[];
  cover: IGDBImage;
  summary: string;
  name: string;
  platforms: Platform[];
  storyline;
}

const extractUsefulImage = (img: IGDBImage & any): IGDBImage => {
  return {
    image_id: img.image_id,
    id: img.id,
    url: 'https:' + img.url.replace('t_thumb', 't_1080p').replace('.jpg', img.alpha_channel ? '.png' : '.jpg'),
  };
};

export class IGBDProvider extends BaseProvider<IGDBGamesResult[]> {

  urlPath = '/igdb/';
  endpoint = process.env.IGDB_ENDPOINT;

  newUrl(path) {
    return `${this.endpoint}${path}&apikey=${process.env.APIKEY}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSearchRequest(searchTerm: string, page: string, platformId?: string): Promise<Request> {
    const searchPath = '/v1.1/Games/ByGameName';
    const url = new URL(
      searchPath,
      process.env.ENDPOINT!,
    );
    url.searchParams.append('name', searchTerm);
    url.searchParams.append('fields', 'platform,players,overview,');
    url.searchParams.append('include', 'boxart,platform');
    url.searchParams.append('page', page);
    url.searchParams.append('apikey', process.env.APIKEY!);
    if (platformId) {
      url.searchParams.append('filter[platform]', `${platformId}`);
    }
    return new Request(url);
  }

  async convertToSearchResults(data: IGDBGamesResult[]): Promise<SearchResults> {
    return {
      count: 3,
      results: data.map(({ id, artworks, cover, name, platforms, screenshots, storyline, summary}) => {
        const result = {
          id,
          name,
          storyline,
          summary,
        } as SearchResult;
        if (artworks) {
          result.artworks = artworks.map((data) => extractUsefulImage(data));
        }
        if (screenshots) {
          result.screenshots = screenshots.map((data) => extractUsefulImage(data));
        }
        if (cover) {
          result.cover = extractUsefulImage(cover);
        } else {
          if (artworks) {
            result.cover = result.artworks[0];
          }
        }
        if (platforms) {
          result.platforms = platforms.map(({ abbreviation, name, platform_logo }) => ({
            abbreviation,
            name,
            platform_logo: platform_logo ? extractUsefulImage(platform_logo) : undefined,
          }))
        }
        return result;
      }),
    };
  }
}