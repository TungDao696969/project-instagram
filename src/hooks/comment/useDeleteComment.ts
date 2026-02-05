import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "@/services/commentApi";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => deleteCommentApi(postId, commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.postId],
      });
    },
  });
}
