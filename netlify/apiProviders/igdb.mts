import { BaseProvider } from "./baseProvider.mjs";
import { getToken } from "./twitchTokenManager.mjs";
import type { ResultImage, SearchResult, SearchResults, PlatformResults } from "./types.mts";

type IGDBMultiQueryResult<T> = {
  name: string;
  result: T
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

type IGDBCompany = {
  id,
  name,
  logo: IGDBImage
}

type IGDBInvolvedCompany = {
  id,
  company: IGDBCompany
}

type IGDBGamesResult = {
  id: string;
  artworks: IGDBImage[];
  screenshots: IGDBImage[];
  cover: IGDBImage;
  summary: string;
  name: string;
  platforms: IGDBPlatformsResult[];
  involved_companies: IGDBInvolvedCompany[];
  storyline;
}

type IGDBPlatformsResult = {
  id: string;
  abbreviation: string;
  alternative_name: string;
  name: string;
  platform_logo: IGDBImage;
  versions: IGDBPlatformsResult[];
}

type IGDBCompanyResult = {
  id;
  name;
  description;
  logo: IGDBImage;
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

export class IGBDProvider extends BaseProvider<IGDBMultiQueryWithCount<IGDBGamesResult[]>> {

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
    const searchPath = 'v4/multiquery';
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
      body: `
      query games/count "games_count" {
        search "${searchTerm}";
        where version_parent = null & (cover != null | artworks != null);
      };

      query games "games" {
        fields id,artworks,cover,genres,name,platforms,screenshots,storyline,summary,artworks.*,cover.*,screenshots.*,platforms.id, involved_companies, involved_companies.company.logo.*
        search "${searchTerm}";
        where version_parent = null & (cover != null | artworks != null);
        limit ${pageSize}; offset ${offSet};
      };`
    });
  }

  async convertToSearchResults(data: IGDBMultiQueryWithCount<IGDBGamesResult[]>): Promise<SearchResults> {
    const games = data[1].result;

    const count = data[0].count;
    return {
      count,
      results: games.map(({ id, artworks, cover, name, platforms, screenshots, storyline, summary, involved_companies }) => {
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
          result.platforms = platforms.map(({ id, abbreviation }) => ({
            id,
            abbreviation,
          }))
        }
        if (involved_companies) {
          console.log(involved_companies)
          result.involved_companies = involved_companies.map(({ id, company }) => ({
            id,
            company: {
              ...company,
              ...(company.logo ? { logo: extractUsefulImage(company.logo) } : {}),
            }
          }));
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
        fields abbreviation, alternative_name, generation, name, platform_logo, versions, platform_logo.*, versions.*, versions.platform_logo.*;
        where platform_logo != null;
        limit 500;
      };`
    });
  }

  async convertToPlatformsResults(data: IGDBMultiQueryWithCount<IGDBPlatformsResult[]>): Promise<PlatformResults> {
    const platforms = data[1].result;
    const count = data[0].count;
    return {
      count,
      results: platforms.map(({ id, name, abbreviation, platform_logo, versions }: IGDBPlatformsResult) => ({
        id,
        name,
        abbreviation,
        versions: versions ? versions.map(({ id, name, abbreviation, platform_logo }) => ({
          id,
          name,
          abbreviation,
          ...(platform_logo ? { platform_logo: extractUsefulImage(platform_logo) } : {}),
        })) : [],
        platform_logo: extractUsefulImage(platform_logo),
      }))
    }
  }

  async getCompaniesRequest(): Promise<Request> {
    const path = 'v4/multiquery';
    const url = new URL(
      path,
      this.endpoint,
    );
    return new Request(url, {
      method: 'POST',
      headers: await this.requestHeaders(),
      body: `
      query companies/count "companies_count" {

      };

      query companies "companies" {
        fields id, description, logo, name, logo.*;
        limit 500;
      };`
    });
  }

  async converToCompaniesResults(data: IGDBMultiQueryWithCount<IGDBCompanyResult[]>): Promise<unknown> {
    const companies = data[1].result;
    console.log(companies)
    const count = data[0].count;
    return {
      count,
      results: companies ? companies.map(({ id, name, description, logo }) => ({
        id,
        name,
        description,
        ...(logo ? { logo: extractUsefulImage(logo) } : {}),
      })) : [],
    }
  }
}