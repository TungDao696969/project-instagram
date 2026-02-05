import { useQuery } from "@tanstack/react-query";
import { getSearchHistoryApi } from "@/services/searchApi";
import type { SearchHistoryItem } from "@/types/search";

export const useSearchHistory = (limit = 20) => {
  return useQuery<SearchHistoryItem[]>({
    queryKey: ["search-history", limit],
    queryFn: () => getSearchHistoryApi(limit),
  });
};
