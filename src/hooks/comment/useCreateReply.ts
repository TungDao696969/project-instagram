// src/hooks/comment/useCreateReply.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentReplies } from "@/services/commentApi";
export function useCreateReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentReplies,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comment-replies", variables.postId, variables.commentId],
      });

      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["newsfeed"],
      });
    },
  });
}
