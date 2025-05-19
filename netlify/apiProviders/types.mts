export type ResultImage = {
  url: string;
  thumb: string;
  id: number;
  image_id: string;
  width: number;
  height: number;
}

export type PlatformResult = {
  id: number;
  name: string;
  abbreviation?: string;
  platform_logo?: ResultImage;
}

export type SearchResult = {
  id: string;
  artworks: ResultImage[];
  screenshots: ResultImage[];
  cover: ResultImage;
  summary: string;
  name: string;
  storyline: string;
  platforms?: (Pick<PlatformResult, 'id' | 'abbreviation'> & { logos: ResultImage[] })[];
  involved_companies: unknown[];
  extra_images: number;
};

export type SearchResults = {
  count: number;
  results: SearchResult[],
}

export type PlatformResults = {
  count: number;
  results: (PlatformResult & {
    versions: PlatformResult[];
    popular?: boolean,
  })[],
}
