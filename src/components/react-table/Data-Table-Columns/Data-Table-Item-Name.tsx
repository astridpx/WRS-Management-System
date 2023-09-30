import React from "react";
import Image, { StaticImageData } from "next/image";
import Round from "@/assets/items_img/rounded_gallon.png";
import {
  ExpenseImages,
  IImages,
} from "@/utils/Stock&Expenses-img/img-category";

export interface IItemsNameColumn {
  item: string;
  img: keyof IImages;
}

export function DataTableItemName({ img, item }: IItemsNameColumn) {
  return (
    <>
      <div className="  flex items-center gap-x-2">
        <Image src={ExpenseImages[img]} alt="Item" height={25} className="" />
        <p>{item}</p>
      </div>
    </>
  );
}
