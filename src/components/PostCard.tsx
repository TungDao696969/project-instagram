import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { resolveUrl } from "@/lib/resolveUrl";
import type { Post } from "@/types/post";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Props {
  post: Post;
}
import clsx from "clsx";
import { useToggleSavePost } from "@/hooks/post/useToggleSavePost";
import { use, useState } from "react";
import { CommentModal } from "@/pages/Comments/CommentModal";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/user/useUser";
export default function PostCard({ post }: Props) {
  const user = (post as any).userId ?? (post as any).user;
  if (!user) return null;
  const { data } = useUserProfile(user._id);
  const navigate = useNavigate();
  const { mutate: toggleLike, isPending } = useToggleLike();
  const { mutate: toggleSave, isPending: isPendingSave } = useToggleSavePost();
  const [openComment, setOpenComment] = useState(false);
  return (
    <div className="border-b bg-white">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            onClick={() => navigate(`/users/${user._id}`)}
            className="h-8 w-8 cursor-pointer"
          >
            <AvatarImage
              src={
                resolveUrl(data?.profilePicture) ||
                resolveUrl(user.profilePicture)
              }
            />
            <AvatarFallback>
              {user.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div
            onClick={() => navigate(`/users/${user._id}`)}
            className="text-sm font-semibold cursor-pointer"
          >
            {user.username}
          </div>
        </div>

        <MoreHorizontal className="h-5 w-5 cursor-pointer" />
      </div>

      {/* ===== Media ===== */}
      <div className="w-full bg-black">
        {post.mediaType === "image" && post.image && (
          <img
            src={resolveUrl(post.image)}
            alt="post"
            className="w-full aspect-square object-cover"
          />
        )}

        {post.mediaType === "video" && post.video && (
          <video
            src={resolveUrl(post.video)}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-square object-cover"
          />
        )}
      </div>

      {/* ===== Actions ===== */}
      <div className="flex items-center justify-between px-3 py-2">
        {/* LEFT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* Like */}
          <button
            onClick={() =>
              toggleLike({ postId: post._id, isLiked: post.isLiked })
            }
            disabled={isPending}
            className="flex items-center gap-1 select-none"
          >
            <Heart
              className={clsx(
                "w-6 h-6 transition",
                post.isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-black hover:text-red-500",
              )}
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button className="flex items-center gap-1">
            <MessageCircle
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpenComment(true)}
            />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          {/* Share */}
          <Send className="w-6 h-6 cursor-pointer text-black" />
        </div>

        {/* RIGHT ACTION */}
        <button
          disabled={isPendingSave}
          onClick={() =>
            toggleSave({
              postId: post._id,
              isSaved: post.isSaved,
            })
          }
        >
          <Bookmark
            className={clsx(
              "w-6 h-6 transition cursor-pointer",
              post.isSaved ? "fill-black text-black" : "text-black",
            )}
          />
        </button>
      </div>

      {/* ===== Caption ===== */}
      <div className="px-4 pt-1 text-sm">
        <span className="font-semibold mr-1">{user.username}</span>
        {post.caption}
      </div>

      {/* ===== Comments ===== */}
      <button
        className="px-4 py-2 text-sm text-muted-foreground cursor-pointer hover:underline"
        onClick={() => setOpenComment(true)}
      >
        Xem tất cả {post.comments} bình luận
      </button>

      <CommentModal
        open={openComment}
        onClose={() => setOpenComment(false)}
        post={post}
      />
    </div>
  );
}
