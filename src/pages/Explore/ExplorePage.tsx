// src/pages/ExplorePage.tsx
import Sidebar from "@/components/Sidebar";
import { ExploreGrid } from "../../components/explore/ExploreGrid";
export default function ExplorePage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-[72px] xl:ml-[240px] flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <ExploreGrid />
        </div>
      </main>
    </div>
  );
}
