import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationsApi } from "@/services/messageApi";

export const useConversations = () => {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getConversationsApi(pageParam, 20),

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined,
  });
};
