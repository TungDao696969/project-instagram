import { useQuery } from "@tanstack/react-query";
import { getUserPosts, type UserPostsFilter } from "@/services/userApi";
import type { UserPostsResponse } from "@/types/user";

export const useUserPosts = (
  userId?: string,
  filter: UserPostsFilter = "all",
) => {
  return useQuery<UserPostsResponse>({
    queryKey: ["user-posts", userId, filter],
    queryFn: () => getUserPosts(userId!, filter),
    enabled: !!userId,
  });
};
