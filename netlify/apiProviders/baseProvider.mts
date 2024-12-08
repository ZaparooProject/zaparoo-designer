import { type SearchResults } from "./types.mts";

export abstract class BaseProvider<T> {
  abstract convertToSearchResults(data: T, count: number): Promise<SearchResults>;
  abstract getSearchRequest(searchTerm: string, page: string, platformId?: string): Promise<Request>;
}