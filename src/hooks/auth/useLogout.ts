import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return useMutation({
    mutationFn: () => logoutApi(refreshToken!),

    onSuccess: () => {
      logoutStore();
      navigate("/login");
    },

    onError: () => {
      logoutStore();
      navigate("/login");
    },
  });
};
