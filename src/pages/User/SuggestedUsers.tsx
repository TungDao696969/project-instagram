// src/components/user/SuggestedUsers.tsx
import { useSuggestedUsers } from "@/hooks/user/useSuggestedUsers";
import { SuggestedUserCard } from "@/components/SuggestedUserCard";

export function SuggestedUsers() {
  const { data, isLoading, isError } = useSuggestedUsers(5);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-500">Failed to load suggested users</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Gợi í cho bạn
        </h3>
        <button className="text-sm font-medium">Xem tất cả</button>
      </div>

      <div className="space-y-3">
        {data?.map((user) => (
          <SuggestedUserCard
            key={user._id}
            user={user}
            onFollow={(id) => {
              console.log("Follow user:", id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
