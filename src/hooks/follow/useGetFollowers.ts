import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowersApi } from "@/services/followApi";

export const useFollowers = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["followers", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getFollowersApi(userId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
};
