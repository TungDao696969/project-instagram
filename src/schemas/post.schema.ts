import { z } from "zod";

export const createPostSchema = z.object({
  caption: z.string().optional(),
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, "File không hợp lệ"),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
