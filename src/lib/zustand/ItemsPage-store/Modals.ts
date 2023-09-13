import { create } from "zustand";
import { IItemspageModalStore } from "../../../../typings";

export const ItemsPageModalStore = create<IItemspageModalStore>((set) => ({
  addItemModal: false,
  editItemModal: false,

  toggleAddItemModal: (state) => set({ addItemModal: state }),
  toggleEditItemModal: (state) => set({ editItemModal: state }),
}));
