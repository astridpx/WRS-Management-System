import { create } from "zustand";
import { IReportpageModalStore } from "../../../../typings";

export const ReportPageModalStore = create<IReportpageModalStore>((set) => ({
  detailModal: false,
  data: [],

  toggleDetailModal: (state) => set({ detailModal: state }),
  clearData: () => set({ data: [] }),
  setData: (state) => set({ data: [...state] }),
}));
