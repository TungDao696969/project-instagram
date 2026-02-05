import { useState } from "react";
import { useCreateReply } from "@/hooks/comment/useCreateReply";

interface Props {
  postId: string;
  commentId: string;
  onDone?: () => void;
}

export function ReplyInput({ postId, commentId, onDone }: Props) {
  const [value, setValue] = useState("");
  const { mutate, isPending } = useCreateReply();

  const handleSubmit = () => {
    if (!value.trim()) return;

    mutate(
      {
        postId,
        commentId,
        content: value,
      },
      {
        onSuccess: () => {
          setValue("");
          onDone?.();
        },
      },
    );
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Trả lời..."
        className="
          flex-1
          bg-transparent
          text-sm
          text-white
          outline-none
          placeholder:text-neutral-500
        "
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isPending}
        className="
          text-blue-500
          text-sm
          font-semibold
          disabled:opacity-50
        "
      >
        Đăng
      </button>
    </div>
  );
}
