import React from "react";
import Image, { StaticImageData } from "next/image";
import Round from "@/assets/items_img/rounded_gallon.png";
import { ExpenseImages } from "@/utils/Stock&Expenses-img/img-category";
import { IImages } from "../../../../typings";

export interface IItemsNameColumn {
  item: string;
  img?: keyof IImages;
  image?: string;
}

export function DataTableItemName({ img, item, image }: IItemsNameColumn) {
  return (
    <>
      <div className="  flex items-center gap-x-2">
        <Image
          src={img ? ExpenseImages[img] : image}
          alt="Item"
          height={100}
          width={50}
          className="h-7 w-auto aspect-[4/3] object-contain"
        />
        <p>{item}</p>
      </div>
    </>
  );
}
