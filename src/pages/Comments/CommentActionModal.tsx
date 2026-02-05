import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeleteComment } from "@/hooks/comment/useDeleteComment";
interface Props {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  postId: string;
  commentId: string;
}

export function CommentActionModal({
  open,
  onClose,
  onEdit,
  postId,
  commentId,
}: Props) {
  const { mutate, isPending } = useDeleteComment();

  const handleDelete = () => {
    mutate({ postId, commentId }, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          p-0
          gap-0
          max-w-sm
          overflow-hidden
          rounded-xl
        "
      >
        <button
          onClick={onEdit}
          className="py-4 text-sm hover:bg-muted cursor-pointer"
        >
          Chỉnh sửa
        </button>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="py-4 text-sm text-red-500 hover:bg-muted cursor-pointer"
        >
          Xóa bình luận
        </button>

        <button
          onClick={onClose}
          className="py-4 text-sm border-t hover:bg-muted"
        >
          Hủy
        </button>
      </DialogContent>
    </Dialog>
  );
}
