import Gas from "@/assets/items_img/GAS.png";
import NoImage from "@/assets/noImage.png";
import Employee from "@/assets/items_img/employee.png";
import Seal from "@/assets/items_img/seal.png";
import Filter from "@/assets/items_img/filter.png";
import { StaticImageData } from "next/image";
import { IImages } from "../../../typings";

export const ExpenseImages: IImages = {
  other: NoImage,
  gas: Gas,
  employee: Employee,
  seal: Seal,
  filter: Filter,
};
