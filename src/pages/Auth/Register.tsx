import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/auth.schema";
import type { RegisterSchema } from "@/schemas/auth.schema";
import { useRegister } from "@/hooks/auth/useRegister";
import { Instagram } from "lucide-react";
import { useState } from "react";
export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  const [avatar, setAvatar] = useState<string | null>(null);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const avatarFile = form.getValues("avatar");
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    mutate(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/instagram-background-gradient-colors_23-2147821882.jpg?w=2000')",
        }}
      >
        <div className="w-full max-w-sm space-y-4 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="mb-5 px-2 flex items-center gap-3 text-2xl font-bold justify-center">
            <Instagram className="w-6 h-6" />
            <span>Instagram</span>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Đăng ký để xem ảnh và video từ bạn bè
          </p>
          {/* <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src={
                    avatar ||
                    "https://static.cdninstagram.com/rsrc.php/v3/yx/r/5Xd5X0kzJbR.png"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  form.setValue("avatar", file);
                  setAvatar(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Chọn ảnh đại diện
          </p> */}

          <Input placeholder="Email" {...form.register("email")} />
          <p className="text-red-500 text-sm">
            {form.formState.errors.email?.message}
          </p>
          <Input placeholder="Username" {...form.register("username")} />
          <p className="text-red-500 text-sm">
            {form.formState.errors.username?.message}
          </p>
          <Input placeholder="Họ và tên" {...form.register("fullName")} />
          <p className="text-red-500 text-sm">
            {form.formState.errors.fullName?.message}
          </p>
          <Input
            type="password"
            placeholder="Mật khẩu"
            {...form.register("password")}
          />
          <p className="text-red-500 text-sm">
            {form.formState.errors.password?.message}
          </p>

          <Input
            type="password"
            placeholder="Nhập lại mật khẩu"
            {...form.register("confirmPassword")}
          />
          <p className="text-red-500 text-sm">
            {form.formState.errors.confirmPassword?.message}
          </p>

          <Button disabled={isPending} className="w-full">
            {isPending ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
