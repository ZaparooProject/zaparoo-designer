export type ResultImage = {
  url: string;
  id: string;
  image_id: string;
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
};

export type SearchResults = {
  results: SearchResult[],
}