import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageApi } from "@/services/messageApi";
import { useAuthStore } from "@/store/authStore";

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: sendMessageApi,

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousData = queryClient.getQueryData([
        "messages",
        conversationId,
      ]);

      const tempId = `temp-${Date.now()}`;

      const optimisticMessage = {
        _id: tempId,
        conversationId,
        senderId: user,
        recipientId: newMessage.recipientId,
        messageType: "text",
        content: newMessage.content,
        isRead: true,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      queryClient.setQueryData(["messages", conversationId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: {
                    ...page.data,
                    messages: [...page.data.messages, optimisticMessage],
                  },
                }
              : page,
          ),
        };
      });

      return { previousData, tempId };
    },

    onError: (_err, _newMessage, context) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        context?.previousData,
      );
    },

    onSuccess: (serverMessage, _vars, context) => {
      queryClient.setQueryData(["messages", conversationId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: {
                    ...page.data,
                    messages: page.data.messages.map((msg: any) =>
                      msg._id === context?.tempId ? serverMessage : msg,
                    ),
                  },
                }
              : page,
          ),
        };
      });
    },
  });
};
