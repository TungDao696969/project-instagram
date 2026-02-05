import { getProfile } from "@/services/authApi";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const setUser = useAuthStore((set) => set.setUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profile = await getProfile();
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      return profile;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};
