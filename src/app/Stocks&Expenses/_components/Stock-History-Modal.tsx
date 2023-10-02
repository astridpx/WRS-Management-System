"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import NoImage from "@/assets/noImage.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StocksModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Stocks-Modal";
import { IoClose } from "react-icons/io5";
import Slim from "@/assets/items_img/slim_gallon.png";
import { DataTable } from "@/components/react-table/main-table";
import { StockHistoryColumns } from "../Stock-History-column";

export const StockHistoryModal = ({ data }: any) => {
  const { toggleHistoryModal, historyModal } = StocksModalStore();

  return (
    <>
      <section
        className={`${
          historyModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Stock History
              </h2>
              <IoClose
                size={22}
                className="cursor-pointer text-gray-500"
                onClick={() => toggleHistoryModal(false)}
              />
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center">
                <Image src={Slim} alt="Image" width={50} height={100} />
                <h1 className="text-3xl font-semibold">Slim Gallon</h1>
              </div>

              <Button variant={"outline"}>Print</Button>
            </div>

            <div className="relative">
              {data ? (
                <DataTable columns={StockHistoryColumns} data={data} />
              ) : (
                "Loading.."
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
