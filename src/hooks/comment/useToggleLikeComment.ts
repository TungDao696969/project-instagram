// hooks/comment/useToggleLikeComment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCommentApi, unlikeCommentApi } from "@/services/commentApi";

export const useToggleLikeComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      isLiked,
    }: {
      commentId: string;
      isLiked: boolean;
    }) => {
      return isLiked
        ? unlikeCommentApi(postId, commentId)
        : likeCommentApi(postId, commentId);
    },

    onMutate: async ({ commentId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["post-comments", postId] });

      const prev = queryClient.getQueryData<any>(["post-comments", postId]);

      queryClient.setQueryData(["post-comments", postId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            comments: page.comments.map((c: any) =>
              c._id === commentId
                ? {
                    ...c,
                    isLiked: !isLiked,
                    likes: isLiked ? c.likes - 1 : c.likes + 1,
                  }
                : c,
            ),
          })),
        };
      });

      return { prev };
    },

    onError: (_, __, ctx) => {
      queryClient.setQueryData(["comments", postId], ctx?.prev);
    },
  });
};
