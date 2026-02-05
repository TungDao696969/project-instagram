import ConversationsSidebar from "./ConversationsSidebar.tsx";
import EmptyMessageState from "./EmptyMessageState.tsx";
import { useConversationStore } from "@/store/conversationStore";
import MessageDetail from "./MessageDetail.tsx";

export default function MessagesLayout() {
  const { activeConversation } = useConversationStore();

  return (
    <div
      className="
        flex
        h-screen
        bg-white
        text-black

        /* CHỪA CHỖ CHO SIDEBAR */
        ml-[72px]
        xl:ml-[190px]
      "
    >
      {/* LEFT: conversations */}
      <ConversationsSidebar />

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center">
        {activeConversation ? <MessageDetail /> : <EmptyMessageState />}
      </div>
    </div>
  );
}
