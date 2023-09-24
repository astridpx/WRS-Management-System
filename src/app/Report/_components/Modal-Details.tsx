"use client";

import { useState, use } from "react";
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
import { ReportPageModalStore } from "@/lib/zustand/ReportPage-store/Btn-Modal";
import { DataTable } from "@/components/react-table/main-table";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { IoClose } from "react-icons/io5";
import { monitoringHistoryColumns } from "../Monitoring-History-Column";

async function getData2() {
  const Data = await fakeCustomer.map((d: any) => {
    const data = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      address: `P-${d.phase} BLK-${d.blk}`,
    };

    return data;
  });
  return Data;
}

const DataGet2 = getData2();

export default function ReportModalDetail() {
  const data = use(DataGet2);
  const { detailModal, toggleDetailModal } = ReportPageModalStore();

  return (
    <>
      <section
        className={`${
          detailModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-5xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Sales Details
              </h2>

              <IoClose
                size={22}
                className="cursor-pointer text-gray-500"
                onClick={() => toggleDetailModal(false)}
              />
            </div>

            <div className="mt-4">
              <DataTable columns={monitoringHistoryColumns} data={data} />
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
