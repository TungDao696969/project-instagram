import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmailApi } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useResendVerificationEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resendVerificationEmailApi,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        navigate("/login", { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Gửi lại email xác thực thất bại",
      );
    },
  });
};
