/**
 * Utility functions for managing blog filter state in URLs
 */

export type FilterState = {
  category?: string;
  author?: string;
  search?: string;
};

/**
 * Builds a URL with filter parameters
 * @param basePath - The base path (e.g., "/", "/posts/my-post")
 * @param filters - Filter state object
 * @returns URL string with query parameters
 */
export function buildUrlWithFilters(basePath: string, filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }

  if (filters.author && filters.author !== "all") {
    params.set("author", filters.author);
  }

  if (filters.search && filters.search.trim()) {
    params.set("search", filters.search.trim());
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Parses filter state from URL search params
 * @param searchParams - URLSearchParams or string
 * @returns FilterState object
 */
export function parseFiltersFromUrl(searchParams: URLSearchParams | string): FilterState {
  const params = typeof searchParams === "string" ? new URLSearchParams(searchParams) : searchParams;

  return {
    category: params.get("category") || "all",
    author: params.get("author") || "all",
    search: params.get("search") || ""
  };
}

/**
 * Builds a home URL with current filters preserved
 * @param currentFilters - Current filter state
 * @returns URL string for homepage with filters
 */
export function buildHomeUrlWithFilters(currentFilters: FilterState): string {
  return buildUrlWithFilters("/", currentFilters);
}
