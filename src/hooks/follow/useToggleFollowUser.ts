import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUserApi, unfollowUserApi } from "@/services/followApi";

export const useToggleFollowUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isFollowing: boolean) => {
      return isFollowing ? unfollowUserApi(userId) : followUserApi(userId);
    },

    onMutate: async (isFollowing) => {
      const queryKey = ["user-profile", userId];

      await queryClient.cancelQueries({ queryKey });

      const prev = queryClient.getQueryData<any>(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          isFollowing: !isFollowing,
          followersCount: isFollowing
            ? old.followersCount - 1
            : old.followersCount + 1,
        };
      });

      return { prev };
    },

    onError: (_, __, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["user-profile", userId], ctx.prev);
      }
    },
  });
};
