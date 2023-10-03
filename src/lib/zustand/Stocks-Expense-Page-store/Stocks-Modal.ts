import { create } from "zustand";
import { IStocksPageStore } from "../../../../typings";

export const StocksModalStore = create<IStocksPageStore>((set) => ({
  stockModal: false,
  historyModal: false,
  modalType: "",
  itemId: "",

  toggleStocksModal: (state) => set({ stockModal: state }),
  setModalType: (state) => set({ modalType: state }),
  toggleHistoryModal: (state) => set({ historyModal: state }),
  setItemId: (state) => set({ itemId: state }),
}));
