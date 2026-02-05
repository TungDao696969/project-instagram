import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authApi";

export const useResetPassword = (token: string) => {
  return useMutation({
    mutationFn: (data: { password: string; confirmPassword: string }) =>
      resetPassword(token, data),
  });
};
