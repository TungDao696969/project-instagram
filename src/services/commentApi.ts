import { api } from "@/lib/axios";

export interface CreateCommentPayload {
  content: string;
  parentCommentId?: string | null;
}
export interface CreateReplyPayload {
  postId: string;
  commentId: string;
  content: string;
}
export const getPostCommentsApi = async ({
  postId,
  limit = 20,
  offset = 0,
}: {
  postId: string;
  limit?: number;
  offset?: number;
}) => {
  const res = await api.get(`/api/posts/${postId}/comments`, {
    params: { limit, offset },
  });

  return res.data.data;
};

export const createComementApi = async (
  postId: string,
  payload: CreateCommentPayload,
) => {
  return api.post(`/api/posts/${postId}/comments`, payload);
};

export const getCommentReplies = async (
  postId: string,
  commentId: string,
  limit = 10,
  offset = 0,
) => {
  const res = await api.get(
    `/api/posts/${postId}/comments/${commentId}/replies`,
    {
      params: { limit, offset },
    },
  );

  return res.data.data;
};

export const createCommentReplies = async ({
  postId,
  commentId,
  content,
}: CreateReplyPayload) => {
  const res = await api.post(
    `/api/posts/${postId}/comments/${commentId}/replies`,
    { content },
  );

  return res.data.data;
};

export const updateCommentApi = (
  postId: string,
  commentId: string,
  content: string,
) => {
  return api.patch(`/api/posts/${postId}/comments/${commentId}`, { content });
};

export const deleteCommentApi = (postId: string, commentId: string) => {
  return api.delete(`/api/posts/${postId}/comments/${commentId}`);
};

export const likeCommentApi = async (postId: string, commentId: string) => {
  const res = await api.post(`/api/posts/${postId}/comments/${commentId}/like`);
  return res.data;
};

export const unlikeCommentApi = async (postId: string, commentId: string) => {
  const res = await api.delete(
    `/api/posts/${postId}/comments/${commentId}/like`,
  );
  return res.data;
};
