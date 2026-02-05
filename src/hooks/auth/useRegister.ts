import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/services/authApi";
import { data, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => registerApi(formData),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(
          res.message + ". Vui lòng kiểm tra email để xác thực tài khoản",
        );
        navigate("/verify-email");
      }
    },
    onError: (error: any) => {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          console.error(`${key} errors:`, errors[key]);
        });
      }

      console.error("Status:", error.response?.status);
      const errorMsg =
        error.response?.data?.message || error.message || "Đăng ký thất bại";
      toast.error(errorMsg);
    },
  });
};
