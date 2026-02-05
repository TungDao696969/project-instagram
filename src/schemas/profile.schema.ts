import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống").optional(),
  username: z.string().min(3, "Username tối thiểu 3 ký tự").optional(),
  bio: z.string().max(150, "Tối đa 150 ký tự").optional(),
  website: z.string().url("Website không hợp lệ").optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  profilePicture: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Ảnh không hợp lệ"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
