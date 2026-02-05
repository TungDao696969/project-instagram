import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPostSchema,
  type CreatePostFormValues,
} from "@/schemas/post.schema";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { useState } from "react";

export default function CreatePostModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit, reset, setValue } =
    useForm<CreatePostFormValues>({
      resolver: zodResolver(createPostSchema),
    });

  const { mutate, isPending } = useCreatePost();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const onSubmit = (values: CreatePostFormValues) => {
    console.log("SUBMIT:", values);

    const formData = new FormData();
    formData.append("file", values.file);
    if (values.caption) {
      formData.append("caption", values.caption);
    }

    mutate(formData, {
      onSuccess: () => {
        reset();
        setPreview(null);
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo bài viết</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* FILE */}
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setValue("file", file);
              setPreview(URL.createObjectURL(file));
              setFileType(file.type.startsWith("video") ? "video" : "image");
            }}
          />

          {/* PREVIEW */}
          {preview && (
            <div className="rounded-md overflow-hidden">
              {fileType === "video" ? (
                <video src={preview} controls />
              ) : (
                <img src={preview} className="w-full" />
              )}
            </div>
          )}

          {/* CAPTION */}
          <Textarea placeholder="Viết caption..." {...register("caption")} />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Đang đăng..." : "Đăng bài"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
