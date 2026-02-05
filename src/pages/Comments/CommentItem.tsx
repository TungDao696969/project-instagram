import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCommentReplies } from "@/hooks/comment/useCommentReplies";
import { ReplyItem } from "./CommentReplies";
import { getProfilePictureUrl } from "@/lib/resolveUrl";
import { useAuthStore } from "@/store/authStore";
import { MoreHorizontal } from "lucide-react";
import { CommentActionModal } from "./CommentActionModal";
import { Heart } from "lucide-react";
import { useToggleLikeComment } from "@/hooks/comment/useToggleLikeComment";
import { cn } from "@/lib/utils";
import { resolveUrl } from "@/lib/resolveUrl";
interface Props {
  comment: any;
  postId: string;
  onReply?: (commentId: string, username?: string) => void;
  onEdit?: (comment: any) => void;
}

export function CommentItem({ comment, postId, onReply, onEdit }: Props) {
  if (!comment) return null;
  const [showReplies, setShowReplies] = useState(false);
  const users = useAuthStore((s) => s.user);
  const user =
    comment.userId ?? comment.user ?? comment.author ?? comment.owner ?? null;
  // const isOwner = users?._id === comment.userId._id;
  const isOwner = users?._id === user?._id;

  const [open, setOpen] = useState(false);
  const { data, isFetching } = useCommentReplies(
    postId,
    comment._id,
    showReplies,
  );
  const { mutate: toggleLike, isPending } = useToggleLikeComment(postId);

  const replies = data?.replies ?? [];

  return (
    <div className="px-4 py-3 group">
      <div className="relative flex gap-3">
        {/* AVATAR */}
        <Avatar className="h-7 w-7">
          <AvatarImage src={resolveUrl(user?.profilePicture)} />
          <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* CONTENT */}
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold mr-2">{user?.username}</span>
            {comment.content}
          </p>

          {/* ACTIONS */}
          <div className="mt-1 flex gap-4 text-xs text-neutral-400">
            {new Date(comment.createdAt).toLocaleDateString("vi-VN")}

            {comment.likes > 0 && (
              <span className={cn(comment.isLiked)}>
                {comment.likes} lượt thích
              </span>
            )}
            {/* TRẢ LỜI */}
            <button
              onClick={() => onReply?.(comment._id, user?.username)}
              className="font-semibold hover:underline"
            >
              Trả lời
            </button>

            {isOwner && (
              <button onClick={() => setOpen(true)}>
                <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100" />
              </button>
            )}
          </div>

          {/* XEM PHẢN HỒI */}
          {!showReplies && (
            <button
              onClick={() => setShowReplies(true)}
              className="mt-2 text-xs text-neutral-400 hover:underline"
            >
              Xem phản hồi
            </button>
          )}

          {/* REPLIES */}
          {showReplies && (
            <div className="mt-2 space-y-1">
              {isFetching && (
                <p className="text-xs text-neutral-500">Đang tải phản hồi...</p>
              )}

              {replies.map((reply: any) => (
                <ReplyItem key={reply._id} reply={reply} />
              ))}
            </div>
          )}

          {/* Like */}
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              toggleLike({
                commentId: comment._id,
                isLiked: comment.isLiked,
              })
            }
            className="absolute right-0 top-1 flex items-center gap-1 text-xs"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition",
                comment.isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-500",
              )}
            />

            {/* {comment.likes > 0 && (
              <span className="text-xs text-neutral-400">{comment.likes}</span>
            )} */}
          </button>
        </div>
      </div>
      <CommentActionModal
        open={open}
        onClose={() => setOpen(false)}
        onEdit={() => {
          setOpen(false);
          onEdit?.(comment);
        }}
        commentId={comment._id}
        postId={postId}
      />
    </div>
  );
}
