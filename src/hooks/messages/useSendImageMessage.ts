// src/hooks/messages/useSendImageMessage.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendImageMessageApi } from "@/services/messageApi";
import { v4 as uuidv4 } from "uuid";
export const useSendImageMessage = (
  conversationId: string,
  currentUserId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendImageMessageApi,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousData = queryClient.getQueryData<any>([
        "messages",
        conversationId,
      ]);

      const file = formData.get("image") as File;
      const previewUrl = URL.createObjectURL(file);
      const id = uuidv4();
      const optimisticMessage = {
        _id: id,
        senderId: { _id: currentUserId },
        messageType: "image",
        imageUrl: previewUrl,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      queryClient.setQueryData(["messages", conversationId], (old: any) => {
        if (!old) return old;

        const lastPage = old.pages[old.pages.length - 1];

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) =>
            index === old.pages.length - 1
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

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["messages", conversationId],
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    },
  });
};
