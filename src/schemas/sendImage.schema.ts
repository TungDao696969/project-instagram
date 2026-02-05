// src/schemas/sendImage.schema.ts
import { z } from "zod";

export const sendImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ảnh tối đa 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Chỉ hỗ trợ JPG, PNG, WEBP",
      },
    ),
});

export type SendImageFormValues = z.infer<typeof sendImageSchema>;
