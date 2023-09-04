"use client";

import { use } from "react";
import { POSDataTable } from "./Main-Table-Customer";
import { userColumns } from "./Customer-Column";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { IoClose } from "react-icons/io5";

async function getData() {
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
const dataPromise = getData();

export default function POSSearchUserModal() {
  const customer = use(dataPromise);
  const { showSelectCustomer, toggleShowSelect } = POSBTNHeaderStore();

  return (
    <>
      <section
        className={`${
          showSelectCustomer ? "block" : "hidden"
        } min-h-screen w-full py-4 bg-black/75 bg-opacity-95 flex items-center justify-center absolute z-20 `}
      >
        <main className="relative min-h-[97vh]  w-[80%] p-4 bg-white ">
          <div className="flex justify-between items-center">
            <h1 className="mb-4 relative ml-4 before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Search Customer
            </h1>
            <IoClose
              size={22}
              className="cursor-pointer text-gray-500"
              onClick={() => toggleShowSelect(false)}
            />
          </div>

          <div className="relative  ">
            <POSDataTable columns={userColumns} data={customer} />
          </div>
        </main>
      </section>
    </>
  );
}
