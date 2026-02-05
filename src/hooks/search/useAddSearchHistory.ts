import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSearchHistoryApi, getSearchHistoryApi } from "@/services/searchApi";
import { useQuery } from "@tanstack/react-query";
import type { SearchHistoryItem } from "@/types/search";
export const useAddSearchHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSearchHistoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search-history"],
      });
    },
  });
};


