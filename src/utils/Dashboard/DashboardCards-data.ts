import { PiHandCoinsLight } from "react-icons/pi";
import { BiMoney, BiSolidShoppingBags } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsCoin } from "react-icons/bs";
import { IconType } from "react-icons";

export interface ICard {
  icon: IconType;
  iconBg: string;
  iconColor: string;
  amount: number;
  title: string;
}

export const CardsData = [
  {
    id: 1,
    icon: PiHandCoinsLight,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    amount: 30000,
    title: "Total Profit",
  },
  {
    id: 2,
    icon: BiMoney,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    amount: 30000,
    title: "Total Sales",
  },
  {
    id: 3,
    icon: LiaFileInvoiceDollarSolid,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    amount: 30000,
    title: "Total Expenses",
  },
  {
    id: 4,
    icon: BsCoin,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    amount: 30000,
    title: "Total Unpaids",
  },
];
