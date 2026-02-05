import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FollowersModal } from "@/components/follow/FollowersModal";
import { FollowingModal } from "@/components/follow/FollowingModal";
import { Grid, Clapperboard, UserSquare } from "lucide-react";
import { useDeleteProfilePicture } from "@/hooks/userProfile/useDeleteProfilePicture";
import { useState } from "react";
import avatarImg from "@/assets/avatarImg.jpg";
import { useUserPosts } from "@/hooks/user/useUserPost";
import { UserPostGrid } from "@/components/post/UserPostGrid";
import { useUserPostStats } from "@/hooks/user/useUserPostStats";
import { useUserProfile } from "@/hooks/user/useUser";
export default function ProfilePage() {
  const { username } = useParams();

  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const user = useAuthStore((s) => s.user);
  const { data: postData, isLoading, isError } = useUserPosts(user?._id);

  const navigate = useNavigate();
  // Profile của chính mình
  const isMe = user?.username === username;

  const getProfilePictureUrl = (picture: string | null | undefined) => {
    if (!picture) return undefined;
    if (picture.startsWith("http")) return picture;
    // Nếu là relative path, thêm baseURL
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}${picture}`;
  };

  const { mutate: deleteAvatar, isPending } = useDeleteProfilePicture();
  const [filter, setFilter] = useState<"all" | "video" | "saved">("all");
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  const { data: profile } = useUserProfile(user?._id);

  const userId = profile?._id;
  const { data: stats } = useUserPostStats(userId);

  console.log("profile", profile);
  console.log("userId", userId);
  console.log("stats", stats);
  return (
    <div className="flex min-h-screen bg-white md:ml-[72px] xl:ml-[140px]">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[935px] px-4 py-10">
          {/* HEADER */}
          <div className="grid grid-cols-[150px_1fr] gap-10 justify-center items-center">
            {/* AVATAR */}
            <div className="flex justify-center">
              <Avatar
                className="w-[150px] h-[150px] cursor-pointer"
                onClick={() => isMe && setOpenAvatarModal(true)}
              >
                <AvatarImage
                  src={
                    user?.profilePicture
                      ? getProfilePictureUrl(user.profilePicture)
                      : avatarImg
                  }
                />

                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* INFO */}
            <div className="flex-1">
              {/* USERNAME + ACTION */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-normal">{profile?.username}</h2>
              </div>

              <div className="flex gap-10 mt-6 text-sm">
                <span>
                  <b>{stats?.totalPosts ?? 0}</b> bài viết
                </span>

                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => setOpenFollowers(true)}
                >
                  <b>{profile?.followersCount ?? 0}</b> người theo dõi
                </span>

                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => setOpenFollowing(true)}
                >
                  Đang theo dõi <b>{profile?.followingCount ?? 0}</b>
                </span>
              </div>

              {/* BIO */}
              <div className="mt-4 space-y-1 text-sm">
                <div className="font-semibold">{user?.fullName}</div>

                <div className="whitespace-pre-line">
                  {user?.bio ?? "Chưa có tiểu sử"}
                </div>

                {user?.website && (
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {user.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          {isMe && (
            <div className="flex gap-2 mt-5 ml-[190px]">
              <button
                className="h-8 px-4 cursor-pointer rounded-md bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold text-black transition"
                onClick={() => navigate("/edit-profile")}
              >
                Chỉnh sửa trang cá nhân
              </button>

              <button className="h-8 px-4 cursor-pointer rounded-md bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold text-black transition">
                Xem kho lưu trữ
              </button>
            </div>
          )}

          {/* TABS */}
          <div className="mt-8 border-t border-neutral-300">
            <div className="flex justify-around gap-10 text-xs tracking-widest text-neutral-400">
              {/* POSTS */}
              <button
                onClick={() => setFilter("all")}
                className={`h-[52px] -mt-px flex items-center gap-2 border-t transition ${
                  filter === "all"
                    ? "border-black text-black"
                    : "border-transparent hover:text-black"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* REELS */}
              <button
                onClick={() => setFilter("video")}
                className={`h-[52px] -mt-px flex items-center gap-2 border-t transition ${
                  filter === "video"
                    ? "border-black text-black"
                    : "border-transparent hover:text-black"
                }`}
              >
                <Clapperboard className="w-4 h-4" />
              </button>

              {/* SAVED */}
              {isMe && (
                <button
                  onClick={() => setFilter("saved")}
                  className={`h-[52px] -mt-px flex items-center gap-2 border-t transition ${
                    filter === "saved"
                      ? "border-black text-black"
                      : "border-transparent hover:text-black"
                  }`}
                >
                  <UserSquare className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* POSTS CONTENT */}
            <div className="mt-4">
              {isLoading && (
                <div className="py-10 text-center text-sm text-neutral-500">
                  Đang tải bài viết...
                </div>
              )}

              {isError && (
                <div className="py-10 text-center text-sm text-red-500">
                  Không thể tải bài viết
                </div>
              )}

              {postData && <UserPostGrid posts={postData.posts} />}
            </div>

            {profile && (
              <>
                <FollowersModal
                  open={openFollowers}
                  onClose={() => setOpenFollowers(false)}
                  userId={profile._id}
                />

                <FollowingModal
                  open={openFollowing}
                  onClose={() => setOpenFollowing(false)}
                  userId={profile._id}
                />
              </>
            )}
          </div>
        </div>

        <Dialog open={openAvatarModal} onOpenChange={setOpenAvatarModal}>
          <DialogContent className="max-w-sm p-0 overflow-hidden rounded-xl">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="text-center text-lg font-semibold">
                Thay đổi ảnh đại diện
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col text-sm">
              {/* Upload */}
              <label
                htmlFor="upload-avatar"
                className="py-3 text-center font-semibold text-blue-500 cursor-pointer hover:bg-muted"
              >
                Tải ảnh lên
              </label>

              <input
                id="upload-avatar"
                type="file"
                accept="image/*"
                className="hidden"
              />

              {/* Delete */}
              {user?.profilePicture && (
                <button
                  disabled={isPending}
                  className="py-3 text-center font-semibold text-red-500 hover:bg-muted disabled:opacity-50"
                  onClick={() => {
                    if (confirm("Bạn có chắc muốn gỡ ảnh đại diện không?")) {
                      deleteAvatar();
                      setOpenAvatarModal(false);
                    }
                  }}
                >
                  {isPending ? "Đang gỡ..." : "Gỡ ảnh hiện tại"}
                </button>
              )}

              <div className="border-t" />

              {/* Cancel */}
              <button
                className="py-3 text-center hover:bg-muted"
                onClick={() => setOpenAvatarModal(false)}
              >
                Hủy
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
