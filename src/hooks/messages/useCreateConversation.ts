import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrGetConversationApi } from "@/services/messageApi";
export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => createOrGetConversationApi(userId),

    onSuccess: (conversation) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};
