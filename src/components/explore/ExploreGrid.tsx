import { useExplorePosts } from "@/hooks/post/useExplorePosts";
import { ExplorePostItem } from "./ExplorePostItem";
import { useEffect, useRef, useState } from "react";
import type { ExplorePost } from "@/types/post";
import { CommentModal } from "@/pages/Comments/CommentModal";
import type { Post } from "@/types/post";
export function ExploreGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useExplorePosts(20);

  const [openComment, setOpenComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ExplorePost | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-center">Lỗi tải explore</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {data?.pages.map((page) =>
          page.posts.map((post) => (
            <div
              key={post._id}
              onClick={() => {
                setSelectedPost(post);
                setOpenComment(true);
              }}
            >
              <ExplorePostItem post={post} />
            </div>
          )),
        )}
      </div>

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="h-10 flex items-center justify-center text-sm text-muted-foreground"
        >
          {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
        </div>
      )}

      {/* Comment modal */}
      <CommentModal
        open={openComment}
        post={selectedPost as any }
        onClose={() => {
          setOpenComment(false);
          setSelectedPost(null);
        }}
      />
    </>
  );
}
