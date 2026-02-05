import { useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/user/useUser";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { resolveUrl } from "@/lib/resolveUrl";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useUserPosts } from "@/hooks/user/useUserPost";
import { CommentModal } from "../Comments/CommentModal";
import type { Post } from "@/types/post";
import { FollowersModal } from "@/components/follow/FollowersModal";
import { FollowingModal } from "@/components/follow/FollowingModal";
import {
  Heart,
  MessageCircle,
  Grid,
  Clapperboard,
  UserSquare,
} from "lucide-react";
import { useUserPostStats } from "@/hooks/user/useUserPostStats";
import { FollowButton } from "@/components/follow/FollowButton";
import { useCreateConversation } from "@/hooks/messages/useCreateConversation";
import { useConversationStore } from "@/store/conversationStore";
import { useNavigate } from "react-router-dom";
export function UserProfilePage() {
  const { userId } = useParams();
  const [openComment, setOpenComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<"all" | "video" | "saved">("all");

  const { data, isLoading, isError } = useUserProfile(userId);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  const { data: postData, isLoading: isPostsLoading } = useUserPosts(
    userId,
    filter,
  );
  const { data: stats } = useUserPostStats(userId);

  const navigate = useNavigate();
  const { mutate, isPending } = useCreateConversation();
  const setActiveConversation = useConversationStore(
    (s) => s.setActiveConversation,
  );

  const handleMessage = () => {
    if (!userId) return;
    mutate(userId, {
      onSuccess: (conversation) => {
        setActiveConversation(conversation);
        navigate("/messages");
      },
    });
  };
  if (isLoading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (isError || !data) {
    return <div className="text-center py-10">Không tìm thấy user</div>;
  }

  return (
    <div className="flex min-h-screen bg-white md:ml-[72px] xl:ml-[140px]">
      <Sidebar />
      <div className="w-full max-w-[935px] mx-auto px-4 py-8 text-black">
        {/* HEADER */}
        <div className="flex ">
          {/* AVATAR */}
          <div className="flex justify-center w-[290px]">
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage src={resolveUrl(data.profilePicture)} />
              <AvatarFallback>
                {data.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* INFO */}
          <div className="flex-1">
            {/* USERNAME + ACTIONS */}
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-normal tracking-wide">
                {data.username}
              </h2>
            </div>

            {/* STATS */}
            <div className="flex gap-10 mt-6 text-base">
              <span>
                <b>{stats?.totalPosts ?? 0}</b> bài viết
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setOpenFollowers(true)}
              >
                <b>{data.followersCount}</b> người theo dõi
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setOpenFollowing(true)}
              >
                <b>{data.followingCount}</b> đang theo dõi
              </span>
            </div>

            {/* BIO */}
            <div className="mt-4 text-sm leading-5">
              <p className="font-semibold">{data.fullName}</p>
              {data.bio && <p>{data.bio}</p>}
              {data.website && (
                <a
                  href={data.website}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  {data.website}
                </a>
              )}
            </div>
            <div className="py-3">
              <FollowButton userId={data._id} isFollowing={data.isFollowing} />

              <Button
                size="sm"
                variant="secondary"
                className="h-8 px-4 ml-2 text-sm font-semibold w-[200px]"
                onClick={handleMessage}
                disabled={isPending}
              >
                {isPending ? "Đang mở..." : "Nhắn tin"}
              </Button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-14 border-t border-neutral-300">
          <div className="flex justify-center gap-14 text-xs tracking-widest text-neutral-400">
            {/* POSTS */}
            <button
              onClick={() => setFilter("all")}
              className={`py-4 border-t flex items-center gap-2 transition ${
                filter === "all"
                  ? "border-black text-black"
                  : "border-transparent hover:text-black"
              }`}
            >
              <Grid className="w-4 h-4" />
              BÀI VIẾT
            </button>

            {/* REELS */}
            <button
              onClick={() => setFilter("video")}
              className={`py-4 border-t flex items-center gap-2 transition ${
                filter === "video"
                  ? "border-black text-black"
                  : "border-transparent hover:text-black"
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              REELS
            </button>

            {/* TAGGED */}
            <button
              onClick={() => setFilter("saved")}
              className={`py-4 border-t flex items-center gap-2 transition ${
                filter === "saved"
                  ? "border-black text-black"
                  : "border-transparent hover:text-black"
              }`}
            >
              <UserSquare className="w-4 h-4" />
              ĐƯỢC GẮN THẺ
            </button>
          </div>
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-3 gap-[3px] mt-1">
          {isPostsLoading && (
            <div className="col-span-3 text-center py-10 text-sm text-neutral-500">
              Đang tải bài viết...
            </div>
          )}

          {!isPostsLoading && postData?.posts.length === 0 && (
            <div className="col-span-3 text-center py-10 text-neutral-500">
              Chưa có bài viết
            </div>
          )}

          {postData?.posts.map((post) => (
            <div
              key={post._id}
              className="relative aspect-square bg-neutral-200 cursor-pointer group"
              onClick={() => {
                setSelectedPost(post);
                setOpenComment(true);
              }}
            >
              {post.mediaType === "image" ? (
                <img
                  src={resolveUrl(post.image!)}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={resolveUrl(post.video!)}
                  className="w-full h-full object-cover"
                  muted
                />
              )}

              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
          flex items-center justify-center gap-6 text-white text-sm font-semibold transition"
              >
                <div className="flex items-center gap-1">
                  <Heart className="w-5 h-5 fill-white" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments}
                </div>
              </div>
            </div>
          ))}

          <CommentModal
            open={openComment}
            post={selectedPost}
            onClose={() => {
              setOpenComment(false);
              setSelectedPost(null);
            }}
          />
          <FollowersModal
            open={openFollowers}
            onClose={() => setOpenFollowers(false)}
            userId={data._id}
          />
          <FollowingModal
            open={openFollowing}
            onClose={() => setOpenFollowing(false)}
            userId={data._id}
          />
        </div>
      </div>
    </div>
  );
}
