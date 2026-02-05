import api from "@/lib/axios";
import type { ConversationsResponse } from "@/types/conversation";
import type { Conversation } from "@/types/conversation";
export const getConversationsApi = async (
  page = 1,
  limit = 20,
): Promise<ConversationsResponse> => {
  const res = await api.get("/api/messages/conversations", {
    params: { page, limit },
  });
  return res.data.data;
};

export const createOrGetConversationApi = async (
  userId: string,
): Promise<Conversation> => {
  const res = await api.post("/api/messages/conversations", {
    userId,
  });

  return res.data.data;
};

export const getMessagesApi = async ({
  conversationId,
  page = 1,
  limit = 50,
}: {
  conversationId: string;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get(
    `/api/messages/conversations/${conversationId}/messages`,
    {
      params: { page, limit },
    },
  );

  return res.data;
};

// gửi tin nhắn
export const sendMessageApi = async (payload: {
  conversationId: string;
  recipientId: string;
  messageType: "text";
  content: string;
}) => {
  const res = await api.post("/api/messages/messages", payload);
  return res.data.data;
};

// gửi tin nhắn hình ảnh
export const sendImageMessageApi = async (formData: FormData) => {
  const res = await api.post("/api/messages/messages", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};
