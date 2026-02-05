import { useQuery } from "@tanstack/react-query";
import { searchUsersApi } from "@/services/searchApi";
export const useSearchUsers = (q: string) => {
  return useQuery({
    queryKey: ["search-users", q],
    queryFn: () => searchUsersApi(q),
    enabled: !!q,
    staleTime: 0,
  });
};
