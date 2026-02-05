// src/pages/Messages/EmptyMessageState.tsx
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyMessageState() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center">
        <MessageCircle className="w-10 h-10" />
      </div>

      <h2 className="text-xl font-semibold">Tin nhắn của bạn</h2>

      <p className="text-sm text-muted-foreground max-w-sm">
        Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
      </p>

      <Button className="bg-blue-600 hover:bg-blue-700">Gửi tin nhắn</Button>
    </div>
  );
}
