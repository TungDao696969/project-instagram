import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveUrl } from "@/lib/resolveUrl";

export function ReplyItem({ reply }: { reply: any }) {
  const user = reply.userId;

  return (
    <div className="flex gap-3 py-1">
      <Avatar className="h-6 w-6">
        <AvatarImage src={resolveUrl(user?.profilePicture)} />
        <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>

      <p className="text-sm text-neutral-200">
        <span className="font-semibold mr-2">{user?.username}</span>
        {reply.content}
      </p>
    </div>
  );
}
