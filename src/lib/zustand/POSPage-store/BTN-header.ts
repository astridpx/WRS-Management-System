import { create } from "zustand";
import { IPOSPageStore } from "../../../../typings";

const POSBTNHeaderStore = create<IPOSPageStore>((set) => ({
  showSelectCustomer: false,

  toggleShowSelect: (state) => set({ showSelectCustomer: state }),
}));

export default POSBTNHeaderStore;
