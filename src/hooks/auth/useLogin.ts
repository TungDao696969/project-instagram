import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      console.log("Full response:", res);

      // res.data có structure: { user: {...}, tokens: { accessToken, refreshToken } }
      const { user, tokens } = res.data;
      const { accessToken, refreshToken } = tokens || {};

      console.log("Extracted:", {
        user: user?.username,
        accessToken: accessToken?.slice(0, 20),
        refreshToken: refreshToken?.slice(0, 20),
      });

      if (!accessToken || !refreshToken) {
        console.error("Error: Token missing", { accessToken, refreshToken });
        toast.error("Login thất bại: Token không được trả về từ server");
        return;
      }

      login({
        user,
        accessToken,
        refreshToken,
      });

      toast.success("Đăng nhập thành công");
      navigate("/");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    },
  });
};
