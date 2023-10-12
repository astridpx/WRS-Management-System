import { create } from "zustand";
// import { IOrderDeliveryStore } from "../../../../typings";

export interface IOrderDeliveryStore {
  ship: any;
  transit: any;
  resetCheckBox: boolean;

  setResetCheckBox: (state: boolean) => void;
  clearOrder: (field: keyof IOrderDeliveryStore) => void;
  insertOrderItem: (field: keyof IOrderDeliveryStore, item: any) => void;
  insertOneItem: (field: keyof IOrderDeliveryStore, item: any) => void;
  removeOrderItemById: (
    field: keyof IOrderDeliveryStore,
    idToRemove: any
  ) => void;
}

const OrderDeliveryStore = create<IOrderDeliveryStore>((set) => ({
  ship: [],
  transit: [],
  resetCheckBox: false,

  setResetCheckBox: (state) => set({ resetCheckBox: state }),

  // Clear the order state
  clearOrder: (field) => set({ [field]: [] }),

  // Insert an item into the order state
  insertOrderItem: (field, newItem) =>
    set((state) => ({ [field]: [...state[field], ...newItem] })),

  insertOneItem: (field, newItem) =>
    set((state) => ({ [field]: [...state[field], newItem] })),

  // Remove an item from the [field] state by its id
  removeOrderItemById: (field, idToRemove) =>
    set((state) => {
      const newOrder = state[field].filter(
        (item: any) => item.id !== idToRemove
      );
      return { [field]: newOrder };
    }),
}));

export default OrderDeliveryStore;
