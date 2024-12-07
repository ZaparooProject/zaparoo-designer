import { BaseProvider } from "./baseProvider.mjs";
import { getToken } from "./twitchTokenManager.mjs";
import type { ResultImage, SearchResult, SearchResults, PlatformResults } from "./types.mts";

type IGDBMultiQueryResult<T> = {
  name: string;
  results: T
}

type IGDBMultiQueryWithCount<T> = [{
  name: string;
  count: number;
}, IGDBMultiQueryResult<T>]

type IGDBImage = {
  url: string;
  id: string;
  image_id: string;
  width: number;
  height: number;
};

type IGDBGamesResult = {
  id: string;
  artworks: IGDBImage[];
  screenshots: IGDBImage[];
  cover: IGDBImage;
  summary: string;
  name: string;
  platforms: IGDBPlatformsResult[];
  storyline;
}

type IGDBPlatformsResult = {
  id: string;
  abbreviation: string;
  alternative_name: string;
  name: string;
  platform_logo: IGDBImage;
}

export const extractUsefulImage = (img: IGDBImage & any): ResultImage => {
  const sizeThumb = img.width >= img.height ? 't_screenshot_big' : 't_cover_big';
  return {
    image_id: img.image_id,
    id: img.id,
    width: img.width,
    height: img.height,
    url: 'https:' + img.url.replace('t_thumb',  't_original').replace('.jpg', img.alpha_channel ? '.png' : '.jpg'),
    thumb: 'https:' + img.url.replace('t_thumb', sizeThumb).replace('.jpg', img.alpha_channel ? '.png' : '.jpg'),
  };
};

export class IGBDProvider extends BaseProvider<IGDBGamesResult> {

  urlPath = '/igdb/';
  endpoint = process.env.IGDB_ENDPOINT;

  newUrl(path) {
    return `${this.endpoint}${path}`;
  }

  async requestHeaders() {
    const token = await getToken();
    return {
      'Accept': 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID!,
      'Authorization': `Bearer ${token}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSearchRequest(searchTerm: string, page: string, platformId?: string): Promise<Request> {
    const searchPath = '/v4/games';
    const url = new URL(
      searchPath,
      this.endpoint,
    );
    const pageSize = 50;
    const offSet = (parseInt(page, 10) - 1) * pageSize;
    return new Request(url, {
      method: 'POST',
      headers: await this.requestHeaders(),
      // parent = null excludes duplicates of versions
      // company involved != null probably excludes romhacks
      body: `fields id,artworks,cover,genres,name,platforms,screenshots,storyline,summary,artworks.*,cover.*,screenshots.*,platforms.*; search "${searchTerm}"; where version_parent = null & (cover != null | artworks != null); limit ${pageSize}; offset ${offSet};`,
    });
  }

  async convertToSearchResults(data: IGDBGamesResult[]): Promise<SearchResults> {
    return {
      results: data.map(({ id, artworks, cover, name, platforms, screenshots, storyline, summary}) => {
        let extraImages = 0;
        const result = {
          id,
          name,
          storyline,
          summary,
        } as SearchResult;
        if (artworks) {
          result.artworks = artworks.map((data) => extractUsefulImage(data));
          extraImages += artworks.length;
        }
        if (screenshots) {
          result.screenshots = screenshots.map((data) => extractUsefulImage(data));
          extraImages += screenshots.length;
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
        result.extra_images = extraImages;
        return result;
      }),
    };
  }

  async getPlatformsRequest(): Promise<Request> {
    const path = 'v4/multiquery';
    const url = new URL(
      path,
      this.endpoint,
    );
    return new Request(url, {
      method: 'POST',
      headers: await this.requestHeaders(),
      body: `
      query platforms/count "platforms_count" {
        where platform_logo != null;
      };

      query platforms "platforms" {
        fields abbreviation, alternative_name, generation, name, platform_logo, platform_logo.*;
        where platform_logo != null;
        limit 500;
      };`
    });
  }

  async convertToPlatformsResults(data: IGDBMultiQueryWithCount<IGDBPlatformsResult[]>): Promise<PlatformResults> {
    const platforms = data[1].results;
    const count = data[0].count;
    return {
      count,
      results: platforms.map(({ id, name, abbreviation, platform_logo }: IGDBPlatformsResult) => ({
        id,
        name,
        abbreviation,
        platform_logo: extractUsefulImage(platform_logo),
      }))
    }
  }
}