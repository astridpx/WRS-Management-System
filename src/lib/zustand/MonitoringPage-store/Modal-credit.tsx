import { create } from "zustand";
import { IItemspageModalStore, IItems } from "../../../../typings";

export interface IMonitoringStore {
  creditModal: boolean;
  totalCredit: number;
  transId: string;
  toggleCreditModal: (state: boolean) => void;
  setBalance: (state: number) => void;
  setTransId: (state: string) => void;
}

export const MonitoringPageModalStore = create<IMonitoringStore>((set) => ({
  creditModal: false,
  totalCredit: 0,
  transId: "",

  toggleCreditModal: (state) => set({ creditModal: state }),
  setBalance: (state) => set({ totalCredit: state }),
  setTransId: (state) => set({ transId: state }),
}));
