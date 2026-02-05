import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFollowers } from "@/hooks/follow/useGetFollowers";
import { FollowerItem } from "./FollowerItem";
import { Loader2 } from "lucide-react";

export function FollowersModal({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFollowers(userId);

  // const followers = data?.pages.flatMap((p) => p.followers) ?? [];
  const followers =
    data?.pages.flatMap((p) => p.followers).filter((u) => u !== null) ?? [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-center">Người theo dõi</DialogTitle>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading && (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {followers.map((u) => (
            <FollowerItem key={u._id} user={u} />
          ))}

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
