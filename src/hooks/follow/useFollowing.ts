import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingApi } from "@/services/followApi";

export const useFollowingInfinite = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["following", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getFollowingApi(userId, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined,
    enabled: !!userId,
  });
};
