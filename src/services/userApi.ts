import api from "@/lib/axios";
import type { SuggestedUser } from "@/types/user";
import type { UserProfile } from "@/types/user";

export const getUserApi = async (userId: string): Promise<UserProfile> => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data.data;
};

export type UserPostsFilter = "all" | "video" | "saved";

export const getUserPosts = async (
  userId: string,
  filter: UserPostsFilter = "all",
  limit = 20,
  offset = 0,
) => {
  const res = await api.get(`/api/posts/user/${userId}`, {
    params: { filter, limit, offset },
  });

  return res.data.data;
};

export const getUserPostStats = async (userId: string) => {
  const res = await api.get(`/api/posts/user/${userId}/stats`);
  return res.data.data;
};

export const getSuggestedUsersApi = async (limit = 5) => {
  const res = await api.get<{
    success: boolean;
    message: string;
    data: SuggestedUser[];
  }>("/api/users/suggested", {
    params: { limit },
  });

  return res.data.data;
};
