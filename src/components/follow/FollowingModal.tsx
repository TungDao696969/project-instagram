import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFollowingInfinite } from "@/hooks/follow/useFollowing";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { resolveUrl } from "@/lib/resolveUrl";
import { FollowButton } from "./FollowButton";
import { useProfile } from "@/hooks/userProfile/useProfile";
interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export function FollowingModal({ open, onClose, userId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFollowingInfinite(userId);

  const { data: me } = useProfile();
  if (!me) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-md">
        {/* HEADER */}
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle>Đang theo dõi</DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="max-h-[400px] overflow-y-auto">
          {data?.pages.map((page) =>
            page.following.map((user) => {
              const isMe = !!me && me?._id === user._id;

              return (
                <div
                  key={user._id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                >
                  <Avatar>
                    <AvatarImage src={resolveUrl(user.profilePicture)} />
                    <AvatarFallback>
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.fullName}
                    </p>
                  </div>
                </div>
              );
            }),
          )}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="w-full py-2 text-sm text-muted-foreground"
            >
              {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
