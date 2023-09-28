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
export type IUser = {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
};

export interface INewUser {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  password: string;
}

export interface IUserFormState {
  showAddCustomerForm: boolean;
  toggleShowCustomerForm: (state: boolean) => void;
}
export interface IUserEdit {
  first_name: string;
  last_name: string;
  email?: string;
  mobile1: string;
  mobile2?: string;
  address?: string;
  blk?: string;
  lot?: string;
  phase?: string;
  comment?: string;
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
  toggleAddItemModal: (state: boolean) => void;
  toggleEditItemModal: (state: boolean) => void;
}

export interface IItems {
  id: number;
  prod_name: string;
  stock: any;
  prod_import: string;
  prod_code: string;
}

export interface IReportpageModalStore {
  detailModal: boolean;
  toggleDetailModal: (state: boolean) => void;
}
