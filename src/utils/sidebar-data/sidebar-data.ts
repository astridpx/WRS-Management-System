import { RxDashboard } from "react-icons/rx";
import { FiUser, FiTruck } from "react-icons/fi";
import { SlCreditCard } from "react-icons/sl";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LuClipboardList } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { ISidebar } from "../../../typings";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsCart2 } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

export const sidebarItems: ISidebar[] = [
  {
    key: 1,
    title: "APPS",
    items: [
      {
        id: 101,
        icon: RxDashboard,
        name: "Dashboard",
        path: "/Dashboard",
      },
      {
        id: 102,
        icon: SlCreditCard,
        name: "POS",
        path: "/POS",
      },
      {
        id: 103,
        icon: MdOutlineSell,
        name: "Buy",
        path: "/Client",
      },
      {
        id: 104,
        icon: FiTruck,
        name: "Delivery",
        path: "/Delivery",
      },
      {
        id: 105,
        icon: BsCart2,
        name: "Orders",
        path: "/Orders",
      },
      {
        id: 105,
        icon: IoBagCheckOutline,
        name: "MyOrders",
        path: "/MyOrders",
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
      {
        id: 115,
        icon: HiOutlineDocumentReport,
        name: "Report",
        path: "/Report",
      },
      {
        id: 116,
        icon: TbReport,
        name: "Purchase History",
        path: "/Purchase-History",
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
      {
        id: 122,
        icon: CgProfile,
        name: "Profile",
        path: "/MyProfile",
      },
    ],
  },
];
