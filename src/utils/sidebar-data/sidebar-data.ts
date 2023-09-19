import { RxDashboard } from "react-icons/rx";
import { FiUser, FiTruck } from "react-icons/fi";
import { SlCreditCard } from "react-icons/sl";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LuClipboardList } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { ISidebar } from "../../../typings";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

export const sidebarItems: ISidebar[] = [
  {
    key: 1,
    title: "APPS",
    items: [
      {
        id: 101,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 102,
        icon: SlCreditCard,
        name: "POS",
        path: "/POS",
      },
      {
        id: 103,
        icon: FiTruck,
        name: "Delivery",
        path: "/Delivery",
      },
    ],
  },

  {
    key: 2,
    title: "MANAGE",
    items: [
      {
        id: 111,
        icon: FiUser,
        name: "Customer",
        path: "/Customer",
      },
      {
        id: 112,
        icon: LuClipboardList,
        name: "Items",
        path: "/Items",
      },

      {
        id: 113,
        icon: LiaStoreAltSolid,
        name: "Monitoring",
        path: "/Monitoring",
      },
      {
        id: 114,
        icon: BiBarChart,
        name: "Stocks / Expenses",
        path: "/Stocks&Expenses",
      },
    ],
  },

  {
    key: 3,
    title: "OTHERS",
    items: [
      {
        id: 120,
        icon: MdOutlineManageAccounts,
        name: "Accounts",
        path: "/Accounts",
      },
      {
        id: 121,
        icon: AiOutlineSetting,
        name: "Settings",
        path: "/Settings",
      },
    ],
  },
];
