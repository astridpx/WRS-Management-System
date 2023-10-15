"use client";

import { ReportPageModalStore } from "@/lib/zustand/ReportPage-store/Btn-Modal";
import { DataTable } from "@/components/react-table/main-table";
import { IoClose } from "react-icons/io5";
import { monitoringHistoryColumns } from "../POS-History-Column";

export default function ReportModalDetail() {
  const {
    detailModal,
    toggleDetailModal,
    data: sortedData,
    clearData,
  } = ReportPageModalStore();

  return (
    <>
      <section
        className={`${
          detailModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-[75rem] w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Sales Details
              </h2>

              <IoClose
                size={22}
                className="cursor-pointer text-gray-500"
                onClick={() => {
                  toggleDetailModal(false);
                  clearData();
                }}
              />
            </div>

            <div className="mt-4 relative overflow-x-hidden">
              <DataTable columns={monitoringHistoryColumns} data={sortedData} />
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
