import ItemsPage from "@/app/Items/page";
import { IconType } from "react-icons";

export interface ILogin {
  email: string;
  username: string;
  password: string;
  role: string;
}

// ? @ desc sidebar main
export interface ISidebar {
  key: number;
  title: string;
  items: ISidebarItems[];
}
// ? @desc sidebar nested Data
export interface ISidebarItems {
  id: number;
  icon: IconType;
  name: string;
  path: string;
}

export interface ISidebarState {
  isExpand: boolean;
  toggleSidebar: (state: boolean) => void;
  expand: () => void;
}

// ? REACT TABLE INTERFACE PROPS
export interface DataTableRowProps<TData> {
  row: Row<TData & any>;
}

export interface IUserFormState {
  showAddCustomerForm: boolean;
  toggleShowCustomerForm: (state: boolean) => void;
}
export interface IUser {
  first_name: string;
  last_name: string;
  email?: string;
  mobile1: string;
  mobile2?: string;
  isVillage: boolean;
  address?: string;
  blk?: number;
  lot?: number;
  phase?: number;
  comment?: string;
  borrowed_gal: {
    slim: {
      borrowed: number;
      gal_type: string;
    };
    round: {
      borrowed: number;
      gal_type: string;
    };
  };
}
export interface IUserEditState {
  userEditData: IUserEdit;
  showEditUserModal: boolean;
  editUserId: any;

  setEditData: (state: IUserEdit) => void;
  setShowEditModal: (state: boolean) => void;
  setEditUserId: (state: any) => void;
}

// POS PAGE
export interface IPOSBtnStore {
  showSelectCustomer: boolean;
  showReturnGallon: boolean;
  selectedCustomer: any;
  toggleShowSelect: (state: boolean) => void;
  toggleShowReturn: (state: boolean) => void;
}

export interface Orders {
  id: string | null;
  img: StaticImport | null;
  type: string | null;
  qty: number;
  price: number;
}
export interface IPOSPaymentModal {
  paymentModal: boolean;
  payment: number;
  order: Orders[];
  togglePaymentModal: (state: boolean) => void;
  setPayment: (state: number) => void;
  clearOrder: () => void;
  setOrder: (id: string | undefined, value: any) => void;
}

// ItemsPage
export interface IItemspageModalStore {
  addItemModal: boolean;
  editItemModal: boolean;
  editData: IItems;
  toggleAddItemModal: (state: boolean) => void;
  toggleEditItemModal: (state: boolean) => void;
  setEditData: (state: Partial<typeof InitialState>) => void;
  setClearState: () => void;
}

export interface IItems {
  _id: any;
  name: string;
  img: string;
  category: string;
  reorder: number;
  pos_item: boolean;
  price: number;
  buy_price: number;
  stock_history?: IStocks[];
}

export interface IReportpageModalStore {
  detailModal: boolean;
  toggleDetailModal: (state: boolean) => void;
}

// ? EXPENSES
export interface IExpenses {
  _id: any;
  name: string;
  amount: number;
  category: string | keyof IImages;
  date: Date;
}

export interface IExpenseDate extends IExpenses {
  sort_date: any;
}
export interface IExpensesPageStore {
  addExpensesModal: boolean;
  editExpensesModal: boolean;
  editData: IExpenses;
  toggleAddExpensesModal: (state: boolean) => void;
  toggleEditExpensesModal: (state: boolean) => void;
  setEditData: (state: Partial<typeof InitialState>) => void;
}

export interface IImages {
  other: StaticImageData;
  gas: StaticImageData;
  employee: StaticImageData;
  seal: StaticImageData;
  filter: StaticImageData;
}

// ? STOCKS
export interface IStocks {
  worth: number;
  qty: number;
  transaction: string;
  date: Date | undefined;
}

export interface IStocksPageStore {
  stockModal: boolean;
  historyModal: boolean;
  modalType: string;
  itemId: string;
  toggleStocksModal: (state: boolean) => void;
  setModalType: (state: string) => void;
  toggleHistoryModal: (state: boolean) => void;
  setItemId: (state: string) => void;
}
