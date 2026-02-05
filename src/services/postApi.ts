// src/services/postApi.ts
import { api } from "@/lib/axios";
import type { ExploreResponse } from "@/types/post";

export const getNewsfeedApi = async (limit: number, offset: number) => {
  const res = await api.get("/api/posts/feed", {
    params: { limit, offset },
  });

  return res.data;
};

// like post
export const likePostApi = async (postId: string) => {
  const res = await api.post(`/api/posts/${postId}/like`);
  return res.data;
};

// delete post
export const deletePostApi = async (postId: string) => {
  const res = await api.delete(`/api/posts/${postId}/like`);
  return res.data;
};

export const savePostApi = async (postId: string) => {
  const res = await api.post(`/api/posts/${postId}/save`);
  return res.data;
};

export const unsavePostApi = async (postId: string) => {
  const res = await api.delete(`/api/posts/${postId}/save`);
  return res.data;
};

// explore post

export const getExplorePostsApi = async (
  page = 1,
  limit = 20,
): Promise<ExploreResponse> => {
  const res = await api.get<{
    success: boolean;
    message: string;
    data: ExploreResponse;
  }>("/api/posts/explore", {
    params: { page, limit },
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  return res.data.data;
};

export const createPostApi = async (data: FormData) => {
  const res = await api.post("/api/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
