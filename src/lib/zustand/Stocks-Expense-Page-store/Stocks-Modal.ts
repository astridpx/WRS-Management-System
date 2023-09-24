import { create } from "zustand";
import { IItemspageModalStore } from "../../../../typings";

export interface IStocksPageStore {
  stockModal: boolean;
  modalType: string;
  toggleStocksModal: (state: boolean) => void;
  setModalType: (state: string) => void;
}

export const StocksModalStore = create<IStocksPageStore>((set) => ({
  stockModal: false,
  modalType: "",

  toggleStocksModal: (state) => set({ stockModal: state }),
  setModalType: (state) => set({ modalType: state }),
}));
