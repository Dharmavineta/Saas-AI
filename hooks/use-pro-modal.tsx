import { create } from "zustand";

type userProModalStore = {
  isOpen: boolean;
  opOpen: () => void;
  onClose: () => void;
};

export const useProModal = create<userProModalStore>((set) => ({
  isOpen: false,
  opOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
