import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useConversations } from "@/hooks/messages/useConversations";
import { useAuthStore } from "@/store/authStore";
import { ConversationItem } from "./ConversationItem";

export default function ConversationsSidebar() {
  const { user } = useAuthStore();
  const { data } = useConversations();

  const conversations = data?.pages.flatMap((p) => p.conversations) ?? [];

  return (
    <div className="w-[380px] border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between">
        <span className="font-semibold text-lg">{user?.username}</span>
        <Pencil className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <Input
          placeholder="Tìm kiếm"
          className="bg-gray-100 border-none text-sm"
        />
      </div>

      {/* Title */}
      <div className="px-4 py-2 text-sm font-semibold">Tin nhắn</div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground mt-10">
            Bạn chưa có cuộc trò chuyện nào
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              currentUserId={user!._id}
            />
          ))
        )}
      </div>
    </div>
  );
}
