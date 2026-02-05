import { getSuggestedUsersApi } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";
export const useSuggestedUsers = (limit = 5) => {
  return useQuery({
    queryKey: ["suggested-users", limit],
    queryFn: () => getSuggestedUsersApi(limit),
    staleTime: 1000 * 60,
  });
};
