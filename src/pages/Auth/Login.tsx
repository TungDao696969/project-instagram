import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import loginIms from "@/assets/authLogin.png";
import { useLogin } from "@/hooks/auth/useLogin";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import type { LoginSchema } from "@/schemas/auth.schema";
export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center items-center px-16">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          className="w-16 mb-6"
        />
        <h1 className="text-4xl font-semibold text-center leading-snug">
          Hãy xem các khoảnh khắc thường ngày của{" "}
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            bạn thân nhé.
          </span>
        </h1>

        <img className="mt-10 w-[400px]" src={loginIms} />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-5"
        >
          <h2 className="text-lg font-semibold">Đăng nhập vào Instagram</h2>

          <Input
            placeholder="Số di động, tên người dùng hoặc email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}

          <Input
            type="password"
            placeholder="Mật khẩu"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isPending}
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <Link
            to="/forgot-password"
            className="text-sm text-center w-full text-blue-600 flex justify-center"
          >
            Quên mật khẩu?
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-muted-foreground">HOẶC</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Button variant="outline" className="w-full rounded-full gap-2">
            <Facebook className="w-4 h-4" />
            Đăng nhập bằng Facebook
          </Button>

          <Link
            to="/register"
            className="block text-center w-full border border-blue-500 text-blue-600 rounded-full py-2"
          >
            Tạo tài khoản mới
          </Link>

          <div className="text-center text-sm text-muted-foreground">Meta</div>
        </form>
      </div>
    </div>
  );
}
