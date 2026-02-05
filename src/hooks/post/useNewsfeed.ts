import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewsfeedApi } from "@/services/postApi";
import type { NewsfeedResponse } from "@/types/post";

const LIMIT = 10;

export const useNewsfeed = () => {
  return useInfiniteQuery<NewsfeedResponse>({
    queryKey: ["newsfeed"],
    initialPageParam: 0,

    queryFn: ({ pageParam }) => {
      return getNewsfeedApi(LIMIT, pageParam as number);
    },

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.data.hasMore) {
        return undefined;
      }

      const nextOffset = pages.length * LIMIT;

      return nextOffset;
    },
  });
};
