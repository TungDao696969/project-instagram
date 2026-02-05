import { resolveUrl } from "@/lib/resolveUrl";
import type { ExplorePost } from "@/types/post";
import { Heart, MessageCircle, Image, Video } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/post";
export function ExplorePostItem({ post }: { post: ExplorePost }) {

  return (
    <div className="relative group cursor-pointer aspect-square bg-muted overflow-hidden">
      {/* Media */}
      {post.mediaType === "image" && post.image && (
        <img
          src={resolveUrl(post.image)}
          alt={post.caption}
          className="w-full h-full object-cover"
          
        />
      )}

      {post.mediaType === "video" && post.video && (
        <video
          src={resolveUrl(post.video)}
          className="w-full h-full object-cover"
           
          muted
        />
      )}

      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
        {post.mediaType === "image" ? (
          <Image className="w-4 h-4 text-white" />
        ) : (
          <Video className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white">
        <div className="flex items-center gap-1 font-semibold">
          <Heart size={20} />
          {post.likes}
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <MessageCircle size={20} />
          {post.comments}
        </div>
      </div>
    </div>
  );
}
