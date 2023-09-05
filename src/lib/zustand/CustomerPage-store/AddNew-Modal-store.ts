import { create } from "zustand";
import { IUserFormState } from "../../../../typings";

const addUserModalStore = create<IUserFormState>((set) => ({
  showAddCustomerForm: false,

  toggleShowCustomerForm: (state) => set({ showAddCustomerForm: state }),
}));

export default addUserModalStore;
