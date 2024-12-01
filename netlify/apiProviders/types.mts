export type ResultImage = {
  url: string;
  thumb: string;
  id: string;
  image_id: string;
  width: number;
  height: number;
}

export type Platform = {
  name: string;
  abbreviation: string;
  platform_logo: ResultImage;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SearchResult = {
  id: string;
  artworks: ResultImage[];
  screenshots: ResultImage[];
  cover: ResultImage;
  summary: string;
  name: string;
  storyline: string;
  platforms?: Platform[];
  extra_images: number;
};

export type SearchResults = {
  results: SearchResult[],
}