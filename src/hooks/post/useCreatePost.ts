import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "@/services/postApi";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createPostApi(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsfeed"] });
    },
  });
};
