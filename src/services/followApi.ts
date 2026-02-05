import api from "@/lib/axios";
import { type FollowingResponse } from "@/types/follow";
export const followUserApi = (userId: string) => {
  return api.post(`/api/follow/${userId}/follow`);
};

export const unfollowUserApi = (userId: string) => {
  return api.delete(`/api/follow/${userId}/follow`);
};

export const getFollowersApi = async (userId: string, page = 1, limit = 20) => {
  const res = await api.get(`/api/follow/${userId}/followers`, {
    params: { page, limit },
  });
  return res.data.data;
};

export const getFollowingApi = async (
  userId: string,
  page = 1,
  limit = 20,
): Promise<FollowingResponse> => {
  const res = await api.get(`/api/follow/${userId}/following`, {
    params: { page, limit },
  });

  return res.data.data;
};
