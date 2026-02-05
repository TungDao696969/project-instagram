import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import SearchPanel from "@/components/search/SearchPanel";
export default function MainLayout() {
   const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className="flex">
      {/* LEFT SIDEBAR */}
      <Sidebar onOpenSearch={() => setOpenSearch(true)} />

      {/* SEARCH OVERLAY */}
      {openSearch && <SearchPanel onClose={() => setOpenSearch(false)} />}

      {/* MAIN CONTENT */}
      <div
        className={`
          flex-1 min-h-screen bg-white
          transition-all
          ml-[50px]
          xl:${openSearch ? "ml-[72px]" : "ml-[50px]"}
        `}
      >
        <Outlet />
      </div>
    </div>
  );
}
