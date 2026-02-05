// src/pages/Messages/ConversationItem.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Conversation } from "@/types/conversation";
import { useConversationStore } from "@/store/conversationStore";
import { cn } from "@/lib/utils";
import { resolveUrl } from "@/lib/resolveUrl";
import { formatMessageTime } from "@/lib/formatMessageTime";
interface Props {
  conversation: Conversation;
  currentUserId: string;
}

export function ConversationItem({ conversation, currentUserId }: Props) {
  const { activeConversation, setActiveConversation } = useConversationStore();

  const otherUser = conversation.participants.find(
    (u) => u._id !== currentUserId,
  );
  const isMe = conversation.lastMessage?.senderId === currentUserId;
  const lastMessageContent = (() => {
    const lastMessage = conversation.lastMessage;

    if (!lastMessage) return "Bắt đầu cuộc trò chuyện";

    if (lastMessage.messageType === "image") {
      return isMe ? "Bạn đã gửi một ảnh" : "Đã gửi một ảnh";
    }

    if (lastMessage.messageType === "text") {
      return isMe ? `Bạn: ${lastMessage.content}` : lastMessage.content;
    }

    return "Bắt đầu cuộc trò chuyện";
  })();

  return (
    <div
      onClick={() => setActiveConversation(conversation)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5",
        activeConversation?._id === conversation._id && "bg-white/10",
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="w-12 h-12">
          <AvatarImage src={resolveUrl(otherUser?.profilePicture)} />
          <AvatarFallback>
            {otherUser?.username?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{otherUser?.username}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground truncate">
            {lastMessageContent}
          </p>
          <p className="text-gray-500 text-xs flex-shrink-0">
            {formatMessageTime(conversation.lastMessage?.createdAt || "")}
          </p>
        </div>
      </div>
    </div>
  );
}
