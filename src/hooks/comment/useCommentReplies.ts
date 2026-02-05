import { getCommentReplies } from "@/services/commentApi";
import { useQuery } from "@tanstack/react-query";
export const useCommentReplies = (
  postId: string,
  commentId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["comment-replies", commentId, postId],
    queryFn: () => getCommentReplies(postId, commentId),
    enabled,
  });
};
