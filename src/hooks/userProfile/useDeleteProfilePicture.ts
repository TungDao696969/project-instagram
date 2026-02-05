import { useMutation } from "@tanstack/react-query";
import { deleteProfilePictureApi } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export const useDeleteProfilePicture = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: deleteProfilePictureApi,

    onSuccess: () => {
      if (!user) return;

      setUser({
        ...user,
        profilePicture: null,
      });

      toast.success("Đã xóa ảnh đại diện");
    },

    onError: (err: any) => {
      console.error("DELETE AVATAR ERROR:", err);
      toast.error(err.response?.data?.message || "Xóa ảnh thất bại");
    },
  });
};
