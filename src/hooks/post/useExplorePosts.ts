import { useInfiniteQuery } from "@tanstack/react-query";
import { getExplorePostsApi } from "@/services/postApi";

export const useExplorePosts = (limit = 20) => {
  return useInfiniteQuery({
    queryKey: ["explore-posts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return getExplorePostsApi(pageParam, limit);
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;

      return allPages.length + 1;
    },

    staleTime: 1000 * 60,
  });
};
