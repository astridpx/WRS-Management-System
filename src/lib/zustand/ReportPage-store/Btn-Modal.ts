import { create } from "zustand";
import { IReportpageModalStore } from "../../../../typings";

export const ReportPageModalStore = create<IReportpageModalStore>((set) => ({
  detailModal: false,

  toggleDetailModal: (state) => set({ detailModal: state }),
}));
