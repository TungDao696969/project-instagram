import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesApi } from "@/services/messageApi";

export const useMessages = (conversationId: string) => {
  return useInfiniteQuery({
    queryKey: ["messages", conversationId],
    enabled: !!conversationId,
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getMessagesApi({
        conversationId,
        page: pageParam,
        limit: 50,
      }),

    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;

      return pagination.hasMore ? pagination.currentPage + 1 : undefined;
    },
  });
};
