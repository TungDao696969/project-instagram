// components/follow/FollowerItem.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { resolveUrl } from "@/lib/resolveUrl";
import { useNavigate } from "react-router-dom";

export function FollowerItem({ user }: { user: any }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${user._id}`)}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={resolveUrl(user.profilePicture)} />
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="font-medium text-sm">{user.username}</div>
        <div className="text-xs text-muted-foreground">{user.fullName}</div>
      </div>
    </div>
  );
}
