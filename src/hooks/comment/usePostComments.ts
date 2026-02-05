import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostCommentsApi } from "@/services/commentApi";

export const usePostComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["post-comments", postId],
    initialPageParam: 0,

    queryFn: ({ pageParam = 0 }) =>
      getPostCommentsApi({
        postId,
        offset: pageParam,
        limit: 20,
      }),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.hasMore) return undefined;
      return allPages.length * 20;
    },
  });
};
