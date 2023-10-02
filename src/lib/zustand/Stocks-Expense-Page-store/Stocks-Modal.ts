import { create } from "zustand";
import { IItemspageModalStore } from "../../../../typings";

export interface IStocksPageStore {
  stockModal: boolean;
  historyModal: boolean;
  modalType: string;
  toggleStocksModal: (state: boolean) => void;
  setModalType: (state: string) => void;
  toggleHistoryModal: (state: boolean) => void;
}

export const StocksModalStore = create<IStocksPageStore>((set) => ({
  stockModal: false,
  historyModal: false,
  modalType: "",

  toggleStocksModal: (state) => set({ stockModal: state }),
  setModalType: (state) => set({ modalType: state }),
  toggleHistoryModal: (state) => set({ historyModal: state }),
}));
