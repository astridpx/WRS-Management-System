import { create } from "zustand";
import { IPOSBtnStore } from "../../../../typings";

const POSBTNHeaderStore = create<IPOSBtnStore>((set) => ({
  showSelectCustomer: false,
  showReturnGallon: false,

  selectedCustomer: false, //? This is the state of the selected customer

  toggleShowSelect: (state) => set({ showSelectCustomer: state }),
  toggleShowReturn: (state) => set({ showReturnGallon: state }),
}));

export default POSBTNHeaderStore;
