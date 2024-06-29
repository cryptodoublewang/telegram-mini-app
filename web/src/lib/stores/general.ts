"use client";

import { create } from "zustand";

export type ScreenName = "tasks" | "play" | "balance" | "friends";

export interface GeneralStore {
  selectedScreen: ScreenName;
  setSelectedScreen: (screen: ScreenName) => void;
}

export const useGeneralStore = create<GeneralStore>()((set) => ({
  selectedScreen: "tasks",
  setSelectedScreen: (screen: ScreenName) => set({ selectedScreen: screen }),
}));
