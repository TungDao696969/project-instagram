import { createComementApi } from "@/services/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      content: string;
      parentCommentId?: string | null;
    }) => createComementApi(postId, payload),

    onSuccess: (_data, variables) => {
      // Cập nhật lại list comment của post
      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      });

      if (variables.parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: ["comment-replies", variables.parentCommentId, postId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["newsfeed"],
      });
    },
  });
};
