import { useQuery } from "@tanstack/react-query";
import { getUserPostStats } from "@/services/userApi";
export const useUserPostStats = (userId?: string) => {
  return useQuery({
    queryKey: ["user-post-stats", userId],
    queryFn: () => getUserPostStats(userId!),
    enabled: !!userId,
  });
};
