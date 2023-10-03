import { create } from "zustand";
import { IExpensesPageStore } from "../../../../typings";

const InitialState = {
  _id: "",
  name: "",
  amount: 0,
  category: "",
  date: new Date(),
};

export const ExpensesModalStore = create<IExpensesPageStore>((set) => ({
  addExpensesModal: false,
  editExpensesModal: false,
  editData: InitialState,

  toggleAddExpensesModal: (state) => set({ addExpensesModal: state }),
  toggleEditExpensesModal: (state) => set({ editExpensesModal: state }),
  setEditData: (state) => set({ editData: state }),
}));
