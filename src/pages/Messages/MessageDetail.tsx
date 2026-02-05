import { useConversationStore } from "@/store/conversationStore";
import { useMessages } from "@/hooks/messages/useMessage";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Video, Info, Image, Smile } from "lucide-react";
import { useEffect, useRef } from "react";
import { resolveUrl } from "@/lib/resolveUrl";
import { formatMessageTime } from "@/lib/formatMessageTime";
import { useState } from "react";
import { useSendMessage } from "@/hooks/messages/useSendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sendImageSchema,
  type SendImageFormValues,
} from "@/schemas/sendImage.schema";
import { useSendImageMessage } from "@/hooks/messages/useSendImageMessage";
export default function MessageDetail() {
  const { user } = useAuthStore();
  console.log(user);

  const activeConversation = useConversationStore((s) => s.activeConversation);

  const conversationId = activeConversation?._id ?? "";

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: sendMessage, isPending } = useSendMessage(conversationId);

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useMessages(conversationId);

  const { register, handleSubmit, reset } = useForm<SendImageFormValues>({
    resolver: zodResolver(sendImageSchema),
  });

  const { mutate: sendImage, isPending: isSendingImage } = useSendImageMessage(
    conversationId,
    user!._id,
  );

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Chọn một cuộc trò chuyện
      </div>
    );
  }

  const messages =
    data?.pages
      .flatMap((page) => page?.data?.messages ?? [])
      .filter((msg) => msg && msg.senderId) ?? [];

  console.log("page", data?.pages[0]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const conversation = useConversationStore((s) => s.activeConversation);

  const otherUser = conversation?.participants.find((p) => p._id !== user?._id);
  const recipientId = otherUser?._id;

  const handleSend = () => {
    if (!recipientId) return;

    // Ưu tiên gửi ảnh
    if (imageFile) {
      const formData = new FormData();
      formData.append("conversationId", conversationId);
      formData.append("recipientId", recipientId);
      formData.append("messageType", "image");
      formData.append("image", imageFile);

      sendImage(formData);

      setImageFile(null);
      setImagePreview(null);
      return;
    }

    if (!text.trim()) return;

    sendMessage({
      conversationId,
      recipientId,
      messageType: "text",
      content: text.trim(),
    });

    setText("");
  };

  // Auto scroll xuống cuối
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col w-full h-full bg-background">
      {/* ================= HEADER ================= */}
      <div className="h-16 shrink-0 px-4 flex items-center justify-between border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src={resolveUrl(otherUser?.profilePicture)} />
            <AvatarFallback>
              {otherUser?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <p className="text-sm font-semibold">
              {otherUser?.fullName || otherUser?.username}
            </p>
            <p className="text-xs text-muted-foreground">
              @{otherUser?.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Phone className="w-5 h-5 cursor-pointer hover:text-foreground" />
          <Video className="w-5 h-5 cursor-pointer hover:text-foreground" />
          <Info className="w-5 h-5 cursor-pointer hover:text-foreground" />
        </div>
      </div>

      {/* ================= MESSAGE LIST ================= */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {hasNextPage && (
          <button
            className="text-xs w-full text-center text-muted-foreground hover:underline"
            onClick={() => fetchNextPage()}
          >
            Tải tin nhắn cũ hơn
          </button>
        )}

        {isLoading && (
          <div className="text-center text-muted-foreground text-sm">
            Đang tải...
          </div>
        )}

        {messages.map((msg) => {
          if (!msg?.senderId) return null;
          const isMe = msg.senderId._id === user?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[60%]
                  ${
                    msg.messageType === "image"
                      ? "p-1 bg-transparent"
                      : isMe
                        ? "px-4 py-2 bg-blue-500 text-white rounded-2xl rounded-br-sm"
                        : "px-4 py-2  text-foreground rounded-2xl rounded-bl-sm"
                  }
                `}
              >
                {msg.messageType === "image" ? (
                  <div className="max-w-[240px]">
                    <img
                      src={resolveUrl(msg.imageUrl)}
                      className="rounded-xl object-cover"
                    />

                    {msg.status === "sending" && (
                      <p className="text-xs text-muted mt-1">Đang gửi...</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-blue-500 text-white px-3 py-2 rounded-xl">
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT ================= */}
      <div className="shrink-0 border-t border-border px-4 py-3 bg-background">
        <div className="flex items-center gap-3 bg-muted rounded-full px-4 py-2">
          {/* <Image className="w-5 h-5 text-muted-foreground cursor-pointer" /> */}
          <form onSubmit={handleSubmit(handleSend)}>
            <label className="cursor-pointer">
              <Image className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </form>
          <Smile className="w-5 h-5 text-muted-foreground cursor-pointer" />

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="preview"
                className="w-16 h-16 object-cover rounded-xl border"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập tin nhắn..."
            className="border-none bg-transparent focus-visible:ring-0"
          />

          <Button
            variant="link"
            className="text-blue-500 font-semibold"
            disabled={(!text.trim() && !imageFile) || isPending}
            onClick={handleSend}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
}
