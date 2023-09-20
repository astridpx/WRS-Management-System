import React from "react";
import Image, { StaticImageData } from "next/image";
import Round from "@/assets/items_img/rounded_gallon.png";

export interface IItemsNameColumn {
  item: string;
  img: StaticImageData;
}

export function DataTableItemName({ img, item }: IItemsNameColumn) {
  return (
    <>
      <div className="  flex items-center gap-x-2">
        <Image src={img} alt="Item" height={25} className="" />
        <p>{item}</p>
      </div>
    </>
  );
}
