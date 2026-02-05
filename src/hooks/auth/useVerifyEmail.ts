import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        navigate("/login", { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xác thực email thất bại");
    },
  });
};
