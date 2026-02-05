import { resolveUrl } from "@/lib/resolveUrl";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/post";
import { CommentModal } from "@/pages/Comments/CommentModal";

interface Props {
  posts: Post[];
}

export function UserPostGrid({ posts }: Props) {
  const [openComment, setOpenComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (!posts.length) {
    return (
      <div className="py-20 text-center text-sm text-neutral-500">
        Chưa có bài viết nào
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative aspect-square bg-black overflow-hidden group cursor-pointer"
            onClick={() => {
              setSelectedPost(post);
              setOpenComment(true);
            }}
          >
            {/* MEDIA */}
            {post.mediaType === "image" ? (
              <img
                src={resolveUrl(post.image)}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={resolveUrl(post.video)}
                className="w-full h-full object-cover"
                muted
              />
            )}

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-black/50
                opacity-0
                group-hover:opacity-100
                transition
                flex items-center justify-center
              "
            >
              <div className="flex gap-6 text-white font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-5 h-5" />
                  {post.likes}
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <CommentModal
          open={openComment}
          post={selectedPost}
          onClose={() => {
            setOpenComment(false);
            setSelectedPost(null);
          }}
        />
      )}
    </>
  );
}
