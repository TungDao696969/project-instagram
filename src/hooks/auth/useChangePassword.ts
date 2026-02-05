import type { ChangePasswordSchema } from "@/schemas/auth.schema";
import { changePasswordApi } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useChangePassword = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation<unknown, unknown, ChangePasswordSchema>({
    mutationFn: changePasswordApi,

    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công. Vui lòng nhập lại mật khẩu");
      logout();
      navigate("/login");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
    },
  });
};
