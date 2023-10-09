"use client";

import Image from "next/image";
import NoImage from "@/assets/noImage.png";
import { Button } from "@/components/ui/button";
import { StocksModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Stocks-Modal";
import { IoClose } from "react-icons/io5";
import { DataTable } from "@/components/react-table/main-table";
import { StockHistoryColumns } from "../Stock-History-column";
import { format } from "date-fns";

export const StockHistoryModal = () => {
  const { toggleHistoryModal, historyModal, stock_history } =
    StocksModalStore();
  // Check if stock_history is an array before using map
  const item = Array.isArray(stock_history)
    ? stock_history.map((d: any) => d)
    : stock_history;

  const Data = item?.stock_history?.map((d: any) => {
    return {
      ...d,
      sort_date: format(new Date(d.date), "LLL dd, y"),
    };
  });

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

            <div className="flex justify-between items-center mt-8 mb-4">
              <div className="flex items-center space-x-4 ">
                <div className="border w-[6rem] h-[6rem] p-2 shadow-sm rounded-lg">
                  <Image
                    src={item.img}
                    alt="Image"
                    height={100}
                    width={100}
                    className="h-full w-full object-contain aspect-[4/3]"
                  />
                </div>
                <h1 className="text-2xl font-semibold text-slate-600">
                  {item.name}
                </h1>
              </div>

              <Button variant={"outline"}>Print</Button>
            </div>

            <div className="relative">
              {Data ? (
                <DataTable columns={StockHistoryColumns} data={Data} />
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
