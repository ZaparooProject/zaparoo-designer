import { type SearchResult } from "../../netlify/apiProviders/types.mts";

export const findScreenshotUrl = (game: Partial<SearchResult>) => {
  const { screenshots } = game;
  if (screenshots && screenshots[0]) {
    return screenshots[0].url;
  }
  else {
    return '';
  }
}

export const findPlatformLogoUrl = (game: Partial<SearchResult>) => {
  const { platforms } = game;
  if (platforms && platforms[0]?.logos?.[0]) {
    return platforms[0].logos[0].url;
  }
  else {
    return '';
  }
}

export const findCompanyLogoUrl = (game: Partial<SearchResult>) => {
  const { involved_companies } = game;
  if (involved_companies && involved_companies[0]?.company?.logo) {
    return involved_companies[0]?.company?.logo.url;
  }
  else {
    return '';
  }
}