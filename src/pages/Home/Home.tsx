// pages/Home.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/Sidebar";
import avatarImg from "@/assets/avatarImg.jpg";
import { useNewsfeed } from "@/hooks/post/useNewsfeed";
import PostCard from "@/components/PostCard";
import { SuggestedUsers } from "../User/SuggestedUsers";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const getProfilePictureUrl = (picture: string | null | undefined) => {
    if (!picture) return avatarImg;
    if (picture.startsWith("http")) return picture;
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}${picture}`;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNewsfeed();

  // const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];
  const posts =
    data?.pages.flatMap((page, index) => {
      console.log(` page ${index}`, page.data.posts);
      return page.data.posts;
    }) ?? [];

  return (
    <div
      className="
        max-w-[1300px]
        flex
        min-h-screen
        bg-white
        md:ml-[72px]
        xl:ml-[140px]
        "
    >
      {/* LEFT SIDEBAR */}
      {/* <Sidebar /> */}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[630px] py-6 space-y-6">
          {/* STORIES */}
          {/* <div className="flex gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <Avatar className="w-16 h-16 border-2 border-white">
                    <AvatarImage
                      src={`https://i.pravatar.cc/100?img=${i + 1}`}
                    />
                  </Avatar>
                </div>
                <span className="text-xs">user_{i + 1}</span>
              </div>
            ))}
          </div> */}

          {/* POSTS */}
          <div className="max-w-md mx-auto space-y-6">
            {/* NEWSFEED */}
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}

            {/* LOAD MORE */}
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-full border rounded-md py-2 text-sm"
              >
                {isFetchingNextPage ? "Đang tải..." : "Tải thêm"}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:block w-[280px] xl:w-[320px] px-4 xl:px-6 py-6">
        {user && (
          <div className="flex items-center justify-between mb-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/profile/${user?.username}`)}
            >
              <Avatar>
                <AvatarImage src={getProfilePictureUrl(user.profilePicture)} />
                <AvatarFallback>
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-muted-foreground">
                  {user.fullName}
                </div>
              </div>
            </div>

            <button className="text-blue-500 text-sm">Chuyển</button>
          </div>
        )}

        <SuggestedUsers />
      </aside>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => navigate("/messages")}
          className="
          
          flex items-center gap-3
          bg-white
          shadow-lg
          rounded-full
          px-6 py-4
          hover:bg-neutral-50
          transition
        "
        >
          {/* ICON */}
          <Send className="w-5 h-5" />

          {/* TEXT */}
          <span className="font-medium text-sm">Tin nhắn</span>
        </button>
      </div>
    </div>
  );
}
