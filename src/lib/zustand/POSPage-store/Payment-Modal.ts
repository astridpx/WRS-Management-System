import { create } from "zustand";
import { IPOSPaymentModal } from "../../../../typings";

export const POSPaymentModal = create<IPOSPaymentModal>((set) => ({
  paymentModal: false,
  payment: 0,
  order: [],

  togglePaymentModal: (state) => set({ paymentModal: state }),
  setPayment: (state) => set({ payment: state }),
  setOrder: (id, value) => {
    set((state) => {
      // Find the index of the object with the matching 'id'
      const index = state.order.findIndex((item) => item.id === id);

      if (index === -1) {
        // If no object with the specified 'id' was found, return the current state unchanged
        return { order: [...state.order, { ...value }] };
      }

      // Create a copy of the current 'order' array
      const updatedOrder = [...state.order];

      // Update the object at the found index with the new data
      updatedOrder[index] = { ...updatedOrder[index], ...value };

      // Update the state with the modified 'order' array
      return { ...state, order: updatedOrder };
    });
  },
}));
