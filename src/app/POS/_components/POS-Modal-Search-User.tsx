"use client";

import { use } from "react";
import { POSDataTable } from "../Main-Table-Customer";
import { userColumns } from "../Customer-Column";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { IoClose } from "react-icons/io5";
import { useQuery } from "react-query";
import { getAllCustomers } from "../services/Apis";
import Loader from "@/components/loader/Spinner";

export default function POSSearchUserModal() {
  const { showSelectCustomer, toggleShowSelect } = POSBTNHeaderStore();
  const { isLoading, data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

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
              {isLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <POSDataTable columns={userColumns} data={customers} />
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
