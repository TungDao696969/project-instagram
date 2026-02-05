import api from "@/lib/axios";
import { type UserSearch } from "@/types/search";

export const searchUsersApi = async (q: string): Promise<UserSearch[]> => {
  const res = await api.get("/api/users/search", {
    params: { q },
  });

  return res.data.data;
};

export const getSearchHistoryApi = async (limit = 20) => {
  const res = await api.get("/api/search-history", {
    params: { limit },
  });
  return res.data.data;
};

export const addSearchHistoryApi = async (payload: {
  searchedUserId?: string;
  searchQuery: string;
}) => {
  const res = await api.post("/api/search-history", payload);
  return res.data.data;
};

export const deleteSearchHistoryApi = (historyId: string) => {
  return api.delete(`/api/search-history/${historyId}`);
};

export const clearSearchHistoryApi = async () => {
  const res = await api.delete("/api/search-history");
  return res.data;
};
