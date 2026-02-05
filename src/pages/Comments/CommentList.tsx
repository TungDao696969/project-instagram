import { usePostComments } from "@/hooks/comment/usePostComments";
import { CommentItem } from "./CommentItem";

interface Props {
  postId: string;
  onReply?: (commentId: string, username?: string) => void;
  onEdit?: (comment: any) => void;
}

export function CommentList({ postId, onReply, onEdit }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePostComments(postId);

  const comments = data?.pages.flatMap((page) => page.comments ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="py-4 text-center text-sm text-neutral-400">
        Đang tải bình luận...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4 text-center text-sm text-red-500">
        Không thể tải bình luận.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p className="px-4 text-sm text-neutral-400">Chưa có bình luận nào.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={postId}
            onReply={onReply}
            onEdit={onEdit}
          />
        ))
      )}

      {/* LOAD MORE */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="px-4 text-xs text-neutral-400 hover:underline"
        >
          {isFetchingNextPage ? "Đang tải..." : "Xem thêm bình luận"}
        </button>
      )}
    </div>
  );
}
