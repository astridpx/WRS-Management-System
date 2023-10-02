import { create } from "zustand";
import { IItemspageModalStore, IItems } from "../../../../typings";

const InitialState = {
  _id: null,
  name: "",
  img: "",
  category: "",
  reorder: 0,
  pos_item: false,
  price: 0,
  buy_price: 0,
};

export const ItemsPageModalStore = create<IItemspageModalStore>((set) => ({
  addItemModal: false,
  editItemModal: false,
  editData: InitialState,

  toggleAddItemModal: (state) => set({ addItemModal: state }),
  toggleEditItemModal: (state) => set({ editItemModal: state }),
  setEditData: (state) => set({ editData: state }),
  setClearState: () => set({ editData: InitialState }),
}));
