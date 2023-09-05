"use client";

import { use } from "react";
import { POSDataTable } from "../Main-Table-Customer";
import { userColumns } from "../Customer-Column";
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
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative min-h-[97vh]  w-[80%] p-4 bg-white ">
            <div className="flex justify-between items-center">
              <h1 className="mb-4 relative font-semibold text-gray-900 ml-4 before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
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
        </div>
      </section>
    </>
  );
}
