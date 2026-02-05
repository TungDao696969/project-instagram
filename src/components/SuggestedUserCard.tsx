// src/components/user/SuggestedUserCard.tsx
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { SuggestedUser } from "@/types/user";
import { resolveUrl } from "@/lib/resolveUrl";
import { useNavigate } from "react-router-dom";

interface Props {
  user: SuggestedUser;
  onFollow?: (userId: string) => void;
}

export function SuggestedUserCard({ user, onFollow }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between gap-3"
      onClick={() => navigate(`/users/${user._id}`)}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={resolveUrl(user.profilePicture)} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-medium text-sm">{user.username}</p>
          <p className="text-xs text-muted-foreground">{user.fullName}</p>
        </div>
      </div>

      <Button
        size="sm"
        className="text-blue-500"
        variant="link"
        onClick={() => onFollow?.(user._id)}
      >
        Follow
      </Button>
    </div>
  );
}
