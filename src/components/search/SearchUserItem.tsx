import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "@/lib/resolveUrl";
import { useAddSearchHistory } from "@/hooks/search/useAddSearchHistory";
import type { SearchedUser, SearchHistoryItem } from "@/types/search";
import { X } from "lucide-react";
import { useDeleteSearchHistory } from "@/hooks/search/useDeleteSearchHistory";
import { useClearSearchHistory } from "@/hooks/search/useDeleteSearchHistory";
export default function SearchUserItem({
  user,
  keyword,
  historyId,
  onSelect,
}: {
  user: SearchedUser;
  historyId?: string;
  keyword: string;
  onSelect: () => void;
}) {
  const navigate = useNavigate();
  const { mutate } = useAddSearchHistory();
  const { mutate: deleteHistory, isPending } = useDeleteSearchHistory();
  const handleClick = () => {
    mutate({
      searchedUserId: user._id,
      searchQuery: keyword || user.username,
    });

    navigate(`/users/${user._id}`);
    onSelect();
  };

  return (
    <div
      // onClick={() => {
      //   navigate(`/users/${user._id}`);
      //   onSelect();
      // }}
      onClick={handleClick}
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
    >
      <Avatar>
        <AvatarImage src={resolveUrl(user?.profilePicture)} />
        <AvatarFallback>
          {user?.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div>
        <div className="font-medium">{user?.username}</div>
        <div className="text-sm text-muted-foreground">{user?.fullName}</div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteHistory(historyId!);
        }}
        disabled={isPending}
        className="ml-auto text-muted-foreground hover:text-destructive"
      >
        <X size={16} />
      </button>

      
    </div>
  );
}
