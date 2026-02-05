import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schemas/auth.schema";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { ForgotPasswordSchema } from "@/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useForgotPassword();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    mutate(data.email, {
      onSuccess: () => {
        toast.success(
          "Chúng tôi đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư 📧",
        );
        form.reset();
      },
      onError: () => {
        toast.error("Email không tồn tại hoặc có lỗi xảy ra");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-xl font-semibold text-center">Quên mật khẩu?</h1>

        <p className="text-sm text-center text-muted-foreground">
          Nhập email để nhận link đặt lại mật khẩu
        </p>

        <Input placeholder="Email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? "Đang gửi..." : "Gửi email"}
        </Button>

        <Link to="/login" className="block text-center text-sm text-blue-600">
          Quay lại đăng nhập
        </Link>
      </form>
    </div>
  );
}
