import { create } from "zustand";
import { IPOSPaymentModal } from "../../../../typings";

export const POSPaymentModal = create<IPOSPaymentModal>((set) => ({
  paymentModal: false,

  togglePaymentModal: (state) => set({ paymentModal: state }),
}));
