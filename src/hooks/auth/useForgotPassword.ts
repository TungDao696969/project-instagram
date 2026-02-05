import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "@/services/authApi";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordApi(email),
  });
};
