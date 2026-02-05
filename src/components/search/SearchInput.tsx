import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchFormValues } from "@/schemas/search.schema";
import { useEffect, useState } from "react";
import { useSearchUsers } from "@/hooks/search/useSearchUsers";
import { useSearchHistory } from "@/hooks/search/useSearchHistory";
import SearchUserItem from "./SearchUserItem";
import { Loader2 } from "lucide-react";
import { useClearSearchHistory } from "@/hooks/search/useDeleteSearchHistory";
export default function SearchInput({ onClose }: { onClose: () => void }) {
  const { register, watch, reset } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
  });

  const q = (watch("q") || "").trim();

  const [debounced, setDebounced] = useState("");

  const { data: history } = useSearchHistory();
  console.log("History", history);

  const { data: users, isLoading } = useSearchUsers(debounced);
  const { mutate: clearAll, isPending } = useClearSearchHistory();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <>
      <Input
        placeholder="Tìm kiếm"
        {...register("q")}
        className="w-full rounded-full bg-gray-100 px-4 py-2 outline-none mt-3"
      />

      {!q && history && history.length > 0 && (
        <div className="flex justify-end px-2">
          <button
            onClick={() => clearAll()}
            disabled={isPending}
            className="text-sm mt-3 text-muted-foreground hover:text-destructive"
          >
            {isPending ? "Đang xóa..." : "Xóa tất cả"}
          </button>
        </div>
      )}

      {/* ================= HISTORY ================= */}
      {!q && history?.length === 0 && (
        <p className="text-sm text-muted-foreground text-center mt-10">
          Không có nội dung hiển thị
        </p>
      )}

      {/* ================= SEARCH RESULT ================= */}
      {q && isLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {q && users && users.length > 0 && !isLoading && (
        
        <div className="space-y-2 mt-3">
          {users.map((user) => (
            <SearchUserItem
              key={user._id}
              user={user}
              keyword={q}
              onSelect={() => {
                reset({ q: "" });
                onClose();
              }}
            />
          ))}
        </div>
      )}

      {!q && history && history.length > 0 && (
        <div className="space-y-2 mt-3">
          {history.map((item) => (
            <SearchUserItem
              key={item._id}
              user={item.searchedUserId}
              historyId={item._id}
              keyword={item.searchQuery}
              onSelect={() => {
                reset({ q: "" });
                onClose();
              }}
            />
          ))}
        </div>
      )}

      {q && users && users.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground text-center mt-10">
          Không tìm thấy kết quả
        </p>
      )}
    </>
  );
}
