import { X } from "lucide-react";
import SearchInput from "./SearchInput";

export default function SearchPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="
        fixed left-[72px] xl:left-[240px] top-0
        h-screen w-[400px]
        bg-white
        border-r
        z-40
        animate-slide-in
        px-3
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-xl font-semibold">Tìm kiếm</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Input */}
      <SearchInput onClose={onClose} />
    </div>
  );
}
