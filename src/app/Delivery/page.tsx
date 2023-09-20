"use client";

import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryColumns } from "./Delivery-Column";
import { DeliveredColumns } from "./Delivered-Column";

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
          <Tabs defaultValue="toShip" className="">
            <div className="w-full h-max bg-slate-100 dark:bg-inherit">
              <TabsList className="grid  grid-cols-2 w-[30rem]">
                <TabsTrigger value="toShip">To Ship</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="toShip">
              <div className="flex justify-end ">
                <Button
                  onClick={() => notify()}
                  className=" bg-white border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white duration-150 "
                >
                  Dispatch Order
                </Button>
              </div>
              <DataTable columns={DeliveryColumns} data={prodData} />
            </TabsContent>
            <TabsContent value="delivered">
              <DataTable columns={DeliveredColumns} data={prodData} />
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default Deliverypage;
