import { create } from "zustand";
import { IStocksPageStore } from "../../../../typings";

export const StocksModalStore = create<IStocksPageStore>((set) => ({
  stockModal: false,
  historyModal: false,
  modalType: "",
  itemId: "",
  img: "",
  stock_history: {
    name: "",
    img: "",
    stock_history: [],
  },

  toggleStocksModal: (state) => set({ stockModal: state }),
  setModalType: (state) => set({ modalType: state }),
  toggleHistoryModal: (state) => set({ historyModal: state }),
  setItemId: (state) => set({ itemId: state }),
  setImg: (state) => set({ img: state }),
  setStockHistory: (state) => set({ stock_history: state }),
}));
