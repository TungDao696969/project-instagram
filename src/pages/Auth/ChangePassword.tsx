import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/auth.schema";
import { useChangePassword } from "@/hooks/auth/useChangePassword";

export default function ChangePasswordPage() {
  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordSchema) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 bg-white p-6 rounded-xl shadow"
        >
          <h1 className="text-xl font-semibold text-center">Đổi mật khẩu</h1>

          {/* CURRENT PASSWORD */}
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Mật khẩu hiện tại"
              {...form.register("currentPassword")}
            />
            {form.formState.errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Mật khẩu mới"
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button disabled={isPending} className="w-full">
            {isPending ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
          </Button>
        </form>
      </div>
    </div>
  );
}
