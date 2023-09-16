import { create } from "zustand";
import { IItemspageModalStore } from "../../../../typings";

export interface IExpensesPageStore {
  addExpensesModal: boolean;
  toggleAddExpensesModal: (state: boolean) => void;
}

export const ExpensesModalStore = create<IExpensesPageStore>((set) => ({
  addExpensesModal: false,

  toggleAddExpensesModal: (state) => set({ addExpensesModal: state }),
}));
