import { updateProfileApi } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (res) => {
      console.log("Update response:", res);
      // res là { message, data: { user data }, success }
      const userData = res.data;

      setUser(userData);

      queryClient.invalidateQueries({
        queryKey: ["profile", userData._id],
      });

      toast.success("Cập nhật thông tin cá nhân thành công");
      navigate("/profile/" + userData.username);
    },
    onError: (error: any) => {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    },
  });
};
