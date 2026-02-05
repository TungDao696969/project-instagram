import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSearchHistoryApi } from "@/services/searchApi";
import { clearSearchHistoryApi } from "@/services/searchApi";
export const useDeleteSearchHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (historyId: string) => deleteSearchHistoryApi(historyId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search-history"],
      });
    },
  });
};

export const useClearSearchHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearSearchHistoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search-history"],
      });
    },
  });
};
