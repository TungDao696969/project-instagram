import { create } from "zustand";
import type { UserProfile } from "@/types/user";

interface ProfileStore {
  viewedUser?: UserProfile;
  setViewedUser: (user: UserProfile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  viewedUser: undefined,
  setViewedUser: (user) => set({ viewedUser: user }),
}));
