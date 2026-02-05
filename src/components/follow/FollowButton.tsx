import { Button } from "@/components/ui/button";
import { useToggleFollowUser } from "@/hooks/follow/useToggleFollowUser";

interface Props {
  userId: string;
  isFollowing: boolean;
  size?: "sm" | "default";
}
export function FollowButton({ userId, isFollowing, size }: Props) {
  const { mutate, isPending } = useToggleFollowUser(userId);

  return (
    <Button
      size={size}
      variant={isFollowing ? "secondary" : "default"}
      disabled={isPending}
      className="w-[200px]"
      onClick={() => mutate(isFollowing)}
    >
      {isFollowing ? "Đang theo dõi" : "Theo dõi"}
    </Button>
  );
}
