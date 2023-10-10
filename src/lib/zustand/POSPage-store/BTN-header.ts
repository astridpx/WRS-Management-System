import { create } from "zustand";
import { IPOSBtnStore } from "../../../../typings";

const POSBTNHeaderStore = create<IPOSBtnStore>((set) => ({
  showSelectCustomer: false,
  showReturnGallon: false,
  selectedCustomer: false, //? This is the state of the selected customer
  customer: [],

  toggleShowSelect: (state) => set({ showSelectCustomer: state }),
  toggleShowReturn: (state) => set({ showReturnGallon: state }),
  setCustomer: (customer) => set((state) => ({ ...state, customer })),
  setselectedCustomer: (state) => set({ selectedCustomer: state }),
}));

export default POSBTNHeaderStore;
