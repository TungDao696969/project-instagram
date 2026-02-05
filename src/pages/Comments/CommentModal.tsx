import { useEffect, useRef, useState } from "react";
import { CommentList } from "@/pages/Comments/CommentList";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, X, MoreHorizontal } from "lucide-react";
import { resolveUrl } from "@/lib/resolveUrl";
import type { Post } from "@/types/post";
import { CreateComment } from "./CreateComment";
import clsx from "clsx";
import avatarImg from "@/assets/avatarImg.jpg";
interface Props {
  open: boolean;
  onClose: () => void;
  post: Post | null;
}

export function CommentModal({ open, onClose, post }: Props) {
  const [replyTarget, setReplyTarget] = useState<{
    commentId: string;
    username: string;
  } | null>(null);

  const [editingComment, setEditingComment] = useState<{
    commentId: string;
    content: string;
  } | null>(null);

  const commentInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !post) return null;

  // const postUser =
  //   (post as any).userId ??
  //   (post as any).user ??
  //   (post as any).postUser ??
  //   null;

  const postUser = typeof post.userId === "object" ? post.userId : null;
  console.log("PostUser", postUser);

  const mediaSrc =
    post.mediaType === "image"
      ? post.image
        ? resolveUrl(post.image)
        : null
      : post.video
        ? resolveUrl(post.video)
        : null;

  const handleReply = (commentId: string, username?: string) => {
    setEditingComment(null);
    setReplyTarget({ commentId, username: username ?? "" });
    setTimeout(() => commentInputRef.current?.focus(), 0);
  };

  const handleEdit = (comment: any) => {
    setReplyTarget(null);
    setEditingComment({
      commentId: comment._id,
      content: comment.content,
    });
    setTimeout(() => commentInputRef.current?.focus(), 0);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[1200px] h-[80vh] bg-black rounded-lg flex overflow-hidden"
        >
          {/* LEFT */}
          <div className="w-[65%] flex items-center justify-center bg-black">
            {post.mediaType === "video" ? (
              <video
                src={mediaSrc ?? undefined}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaSrc ?? ""}
                className="w-full h-full object-cover"
                alt=""
              />
            )}
          </div>

          {/* RIGHT */}
          <div className="w-[35%] bg-[#1c1c1c] text-white flex flex-col">
            {/* header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={resolveUrl(postUser?.profilePicture) || avatarImg}
                  />
                  <AvatarFallback>
                    {postUser?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">
                  {postUser?.username}
                </span>
              </div>
              <MoreHorizontal className="w-5 h-5 cursor-pointer" />
            </div>

            {/* comments */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {post.caption && (
                <div className="flex items-center px-4 py-4 flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={resolveUrl(postUser?.profilePicture) || avatarImg}
                    />
                    <AvatarFallback>
                      {postUser?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    <b className="mr-2">{postUser?.username}</b>
                    {post.caption}
                  </p>
                </div>
              )}

              <CommentList
                postId={post._id}
                onReply={handleReply}
                onEdit={handleEdit}
              />
            </div>

            {/* actions */}
            <div className="px-4 py-3 border-t border-neutral-800 flex gap-4">
              <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
              <MessageCircle className="w-6 h-6 cursor-pointer" />
              <Send className="w-6 h-6 cursor-pointer" />
              <span className="ml-auto text-sm font-semibold">
                {post.likes} lượt thích
              </span>
            </div>

            {/* input */}
            <CreateComment
              postId={post._id}
              parentCommentId={replyTarget?.commentId ?? null}
              inputRef={commentInputRef}
              initialContent={
                editingComment
                  ? editingComment.content
                  : replyTarget
                    ? `@${replyTarget.username} `
                    : undefined
              }
              editCommentId={editingComment?.commentId}
              onSubmitted={() => {
                setReplyTarget(null);
                setEditingComment(null);
              }}
            />
          </div>
        </div>

        {/* close */}
        <button onClick={onClose} className="absolute top-6 right-6 text-white">
          <X className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
