"use client";

import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { Separator } from "@/components/ui/separator";
import POSGallon from "./_components/POS-Table-Gallon";
import POSBottle from "./_components/POS-Table-Bottle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import POSReceipt from "./_components/POS-Receipt";
import POSSearchUserModal from "./_components/POS-Modal-Search-User";
import { POSBTNHeader } from "./_components/POS-BTN-Header";
import { POSSelectCustomerBTN } from "./_components/POS-Select-Customer-BTN";
import POSModalReturnGallon from "./_components/POS-Modal-Return-Gallon";
import AddNewCustomerModal from "@/components/Add-Customer/Add-Customer-Modal";
import { PaymentModal } from "./_components/POS-Modal-Payment";
import { StaticImageData } from "next/image";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";
import { useQueries } from "react-query";
import { getGallons, getBottles } from "./services/Apis";

export interface PosItemProps {
  _id?: string;
  namae: string;
  price: number;
  buy_price: number;
  img: string;
}

export default function POS_Page() {
  const { clearOrder } = POSPaymentModal();
  const results = useQueries([
    { queryKey: ["items, itemGal"], queryFn: getGallons, staleTime: 10 },
    { queryKey: ["items, itemBottle"], queryFn: getBottles, staleTime: 10 },
  ]);

  const gallons = results[0]?.data;
  const bottles = results[1]?.data;

  const gallonsIsLoading = results[0].isLoading;
  const bottlesIsLoading = results[1].isLoading;

  return (
    <>
      <POSSearchUserModal />
      <POSModalReturnGallon />
      <AddNewCustomerModal />
      <PaymentModal />

      <PageWrapper>
        <section className="relative border p-2 bg-white rounded-lg">
          {/* BTN HEADER */}
          <POSBTNHeader />
          <Separator />

          <div className="py-4 min-h-[32rem] ">
            <div className="flex gap-x-4">
              {/* LEFT BOX */}
              <div className="border-2 w-[65%] h-max">
                {/* leftboc head */}
                <POSSelectCustomerBTN />

                <Separator />

                {/* TABS HERE */}
                <Tabs
                  defaultValue="gallon"
                  className="pt-2 "
                  onValueChange={() => clearOrder()}
                >
                  <TabsList className="flex justify-start">
                    <TabsTrigger value="gallon">Gallon</TabsTrigger>
                    <TabsTrigger value="bottle">Bottle</TabsTrigger>
                  </TabsList>

                  <div className="bg-slate-100 w-full">
                    {/* Gallon TAB*/}
                    <TabsContent value="gallon">
                      <header className="h-8 grid grid-cols-8 gap-x-1 place-content-center text-center font-semibold bg-blue-600 text-slate-50">
                        <h4 className="text-sm ">#</h4>
                        <h4 className="text-sm col-span-2">ITEM</h4>
                        <h4 className="text-sm">PRICE</h4>
                        <h4 className="text-sm">CLI-GAL</h4>
                        <h4 className="text-sm">WRS-GAL</h4>
                        {/* <h4 className="text-sm">FREE</h4> */}
                        <h4 className="text-sm">TOTAL</h4>
                        <h4 className="text-sm ">BUY</h4>
                      </header>
                      {gallonsIsLoading
                        ? "Loading..."
                        : gallons.map((item: any) => {
                            return (
                              <>
                                <POSGallon
                                  key={item._id}
                                  id={item._id}
                                  name={item.name}
                                  price={item.price}
                                  buy_price={item.buy_price}
                                  img={item.img}
                                />
                              </>
                            );
                          })}
                    </TabsContent>

                    {/* BOTTLE TAB */}
                    <TabsContent value="bottle">
                      <header className="h-8 grid grid-cols-6 gap-x-1 place-content-center text-center font-semibold bg-blue-600 text-slate-50">
                        <h4 className="text-sm ">#</h4>
                        <h4 className="text-sm col-span-2">ITEM</h4>
                        <h4 className="text-sm">PRICE</h4>
                        <h4 className="text-sm">ORDER</h4>
                        {/* <h4 className="text-sm">FREE</h4> */}
                        <h4 className="text-sm">TOTAL</h4>
                      </header>
                      {bottlesIsLoading
                        ? "Loading..."
                        : bottles.map((item: any) => {
                            return (
                              <>
                                <POSBottle
                                  key={item._id}
                                  id={item._id}
                                  name={item.name}
                                  price={item.price}
                                  img={item.img}
                                />
                              </>
                            );
                          })}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Ribht box */}
              <div className="w-[35%] border">
                <POSReceipt />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
