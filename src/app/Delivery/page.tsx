"use client";

import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DeliveryColumns } from "./Delivery-Column";
import { DataTable } from "@/components/react-table/main-table";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

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

const Deliverypage = () => {
  const prodData = use(dataPromise);
  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <>
      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end ">
            <Button
              onClick={() => notify()}
              className="bg-white border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white duration-150 "
            >
              Dispatch Order
            </Button>
          </div>
          <DataTable columns={DeliveryColumns} data={prodData} />
        </div>
      </PageWrapper>
    </>
  );
};

export default Deliverypage;
