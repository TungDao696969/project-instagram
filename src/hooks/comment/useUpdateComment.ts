import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentApi } from "@/services/commentApi";

interface Params {
  postId: string;
  commentId: string;
  content: string;
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId, content }: Params) =>
      updateCommentApi(postId, commentId, content),

    onSuccess: (_, variables) => {
      // Refresh danh sách comment trong modal
      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.postId],
      });

      // Refresh newsfeed để số comment trên PostCard cập nhật
      queryClient.invalidateQueries({
        queryKey: ["newsfeed"],
      });
    },
  });
};
