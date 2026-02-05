import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from "@/schemas/profile.schema";
import { useUpdateProfile } from "@/hooks/userProfile/useUpdateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/Sidebar";
import avatarImg from "@/assets/avatarImg.jpg";
import { useEffect } from "react";

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);

  const { mutate, isPending } = useUpdateProfile();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      username: "",
      bio: "",
      website: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      fullName: user.fullName ?? "",
      username: user.username ?? "",
      bio: user.bio ?? "",
      website: user.website ?? "",
      gender: user.gender ?? "",
    });
  }, [user, form]);

  const getProfilePictureUrl = (picture: string | null | undefined) => {
    if (!picture) return avatarImg;
    if (picture.startsWith("http")) return picture;
    // Nếu là relative path, thêm baseURL
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}${picture}`;
  };

  const onSubmit = (values: UpdateProfileSchema) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (!value) return;

      if (key === "profilePicture") {
        formData.append("profilePicture", value);
      } else {
        formData.append(key, value as string);
      }
    });
    mutate(formData);
  };

  return (
    <div className="flex min-h-screen bg-white md:ml-[72px] xl:ml-[140px]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[935px] px-6 py-10">
          <h1 className="text-xl font-semibold mb-8 text-center">
            Chỉnh sửa trang cá nhân
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-6">
              {/* LEFT: AVATAR + INFO */}
              <div className="flex items-center gap-5">
                {/* AVATAR */}
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={preview || getProfilePictureUrl(user?.profilePicture)}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* USER INFO */}
                <div>
                  <div className="font-semibold text-lg">{user?.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {user?.fullName}
                  </div>
                </div>
              </div>

              {/* RIGHT: CHANGE BUTTON */}
              <div>
                <label
                  htmlFor="avatar"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition"
                >
                  Đổi ảnh
                </label>

                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    form.setValue("profilePicture", file);

                    // Preview ảnh
                    const imageUrl = URL.createObjectURL(file);
                    setPreview(imageUrl);
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <Input {...form.register("fullName")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input {...form.register("username")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tiểu sử</label>
              <Input {...form.register("bio")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <Input {...form.register("website")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Giới tính
              </label>
              <select
                {...form.register("gender")}
                className="w-full h-10 border border-input rounded-md px-3 text-sm"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Ảnh đại diện
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  form.setValue("profilePicture", e.target.files?.[0])
                }
              />
            </div> */}

            <Button type="submit" disabled={isPending} className="mt-4">
              {isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
