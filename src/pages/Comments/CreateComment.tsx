import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { useUpdateComment } from "@/hooks/comment/useUpdateComment";

interface Props {
  postId: string;
  parentCommentId?: string | null;
  /**
   * Prefill nội dung khi trả lời, ví dụ: "@username "
   */
  initialContent?: string;
  /**
   * Ref để focus input từ component cha (CommentModal)
   */
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /**
   * Gọi sau khi gửi comment/reply thành công
   */
  onSubmitted?: () => void;
  /**
   * Nếu có giá trị => đang ở chế độ chỉnh sửa comment có id này
   */
  editCommentId?: string | null;
}

interface FormValues {
  content: string;
}

export function CreateComment({
  postId,
  parentCommentId = null,
  initialContent,
  inputRef,
  onSubmitted,
  editCommentId,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      content: initialContent ?? "",
    },
  });

  const internalInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createComment, isPending: isCreating } =
    useCreateComment(postId);
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();

  const content = watch("content");

  // Cập nhật nội dung khi initialContent thay đổi (khi bấm Trả lời user khác)
  useEffect(() => {
    if (initialContent !== undefined) {
      setValue("content", initialContent, { shouldDirty: true });
    }
  }, [initialContent, setValue]);

  const onSubmit = (values: FormValues) => {
    if (!values.content.trim()) return;

    // Chế độ chỉnh sửa comment
    if (editCommentId) {
      updateComment(
        {
          postId,
          commentId: editCommentId,
          content: values.content,
        },
        {
          onSuccess: () => {
            reset();
            onSubmitted?.();
          },
        },
      );
      return;
    }

    // Chế độ tạo comment / reply mới
    createComment(
      {
        content: values.content,
        parentCommentId,
      },
      {
        onSuccess: () => {
          reset();
          onSubmitted?.();
        },
      },
    );
  };

  const contentRegister = register("content");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex items-center gap-3
        border-t border-neutral-800
        px-4 py-3
      "
    >
      <input
        {...contentRegister}
        ref={(el) => {
          contentRegister.ref(el);
          internalInputRef.current = el;
          if (inputRef) {
            // đồng bộ ref từ cha
            (inputRef as any).current = el;
          }
        }}
        placeholder="Add a comment..."
        className="
          flex-1
          bg-transparent
          text-sm
          text-white
          placeholder-neutral-500
          outline-none
        "
      />

      <button
        type="submit"
        disabled={!content || isCreating || isUpdating}
        className={`
          text-sm font-semibold
          ${
            content
              ? "text-sky-500 hover:text-sky-400"
              : "text-sky-500/40 cursor-default"
          }
        `}
      >
        Đăng
      </button>
    </form>
  );
}
