import { RxDashboard } from "react-icons/rx";
import { FiUser, FiTruck } from "react-icons/fi";
import { SlCreditCard } from "react-icons/sl";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LuClipboardList } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { ISidebar } from "../../../typings";

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
        icon: FiUser,
        name: "Customer",
        path: "/Customer",
      },
      {
        id: 104,
        icon: LuClipboardList,
        name: "Items",
        path: "/Items",
      },
      {
        id: 105,
        icon: FiTruck,
        name: "Delivery",
        path: "/Delivery",
      },
      {
        id: 106,
        icon: LiaStoreAltSolid,
        name: "Monitoring",
        path: "/Monitoring",
      },
      {
        id: 107,
        icon: BiBarChart,
        name: "Stocks / Expenses",
        path: "/Stocks&Expenses",
      },
      {
        id: 108,
        icon: FiTruck,
        name: "Delivery",
        path: "/",
      },
    ],
  },

  {
    key: 2,
    title: "OTHERS",
    items: [
      {
        id: 109,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 110,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 111,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 112,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 113,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/",
      },
      {
        id: 114,
        icon: RxDashboard,
        name: "Dashboard LAST ",
        path: "/",
      },
    ],
  },
];
