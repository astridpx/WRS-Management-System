import { create } from "zustand";
import { IPOSBtnStore } from "../../../../typings";
import { devtools, persist } from "zustand/middleware";

interface IAccount {
  email: string;
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
  img: string;
}

interface IAccStore {
  user: IAccount;

  setUser: (newUser: any) => void;
  clearUser: () => void;
}

export const UserStore = create<IAccStore>()(
  persist(
    (set) => ({
      user: {
        email: "",
        _id: "",
        first_name: "",
        last_name: "",
        username: "",
        role: "",
        img: "",
      },

      // setUser: (state) => set({ user: state }),
      setUser: (newUser) =>
        set((prevState) => ({ user: { ...prevState.user, ...newUser } })),
      clearUser: () =>
        set({
          user: {
            email: "",
            _id: "",
            first_name: "",
            last_name: "",
            username: "",
            role: "",
            img: "",
          },
        }),
    }),
    {
      name: "user",
      // storage: () => localStorage,
    }
  )
);

// export const UserStore = create<IAccStore>(
//   devtools(
//     persist((set) => ({
//       user: [],

//       setUser: (user) => set((state) => ({ ...state, user })),
//       clearUser: () => set({ user: [] }),
//     }))
//   )
// );
