import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "@/services/userApi";
import type { UserProfile } from "@/types/user";

export function useUserProfile(userId?: string) {
  return useQuery<UserProfile>({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserApi(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
