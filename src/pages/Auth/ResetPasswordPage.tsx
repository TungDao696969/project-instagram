import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/schemas/auth.schema";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { token: urlToken } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const queryToken = searchParams.get("token");
  const token = urlToken || queryToken;
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Token không hợp lệ hoặc đã hết hạn</p>
      </div>
    );
  }

  const { mutate, isPending } = useResetPassword(token);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Đặt lại mật khẩu thành công 🎉");
        setTimeout(() => navigate("/login"), 2000);
      },
      onError: () => {
        toast.error("Token không hợp lệ hoặc đã hết hạn");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-xl font-semibold text-center">Đặt lại mật khẩu</h1>

        <Input
          type="password"
          placeholder="Mật khẩu mới"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}

        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? "Đang xử lý..." : "Xác nhận"}
        </Button>
      </form>
    </div>
  );
}
