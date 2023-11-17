import { create } from "zustand";

export type Auth = {
  token?: string;
  setToken: (token: string) => void;
};

export const useAuthStore = create<Auth>((set, get) => ({
  setToken: (token: string) => set({ token }),
}));
