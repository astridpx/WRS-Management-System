"use client";

import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import POSReceipt from "./_components/POS-Client-Receipt";
import { PaymentModal } from "@/app/POS/_components/POS-Modal-Payment";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";
import { useQueries, useQuery } from "react-query";
import { getAllItems } from "./services/api";
import Item_POS_Card from "./_components/POS-Item-Card";
import { useEffect, useState } from "react";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function Client_POS_Page() {
  const { clearUser, setUser, user } = UserStore();
  const { clearOrder, setIsBuy } = POSPaymentModal();
  const { setCustomer } = POSBTNHeaderStore();
  const [tab, setTab] = useState("gallon");
  const {
    isLoading,
    isError,
    data: allItems,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

  const gallons = allItems?.filter(
    (item: any) => item.category === "container" && item.pos_item === true
  );
  const bottles = allItems?.filter(
    (item: any) => item.category === "bottle" && item.pos_item === true
  );

  useEffect(() => {
    if (tab === "bottle") {
      setIsBuy(true);
    } else {
      setIsBuy(false);
    }

    clearOrder();
  }, [clearOrder, setIsBuy, tab]);

  useEffect(() => {
    setCustomer({ ...user });
  }, [setCustomer, user]);

  return (
    <>
      <PaymentModal />

      <PageWrapper>
        <section className="relative border p-2 bg-white rounded-lg">
          <div className="py-4 min-h-[32rem] ">
            <div className="flex gap-x-4">
              {/* ITEM CARDS */}
              <div className="w-[65%] h-max  ">
                <Tabs
                  value={tab}
                  defaultValue="gallon"
                  className="mb-4  flex justify-between items-center"
                >
                  <h5 className="font-semibold px-2">Product Lists</h5>

                  <div className="flex gap-x-2 px-2">
                    <div
                      className={`cursor-pointer px-6 py-1 text-sm font-semibold border-2 rounded-full shadow border-blue-600  
                      ${
                        tab === "gallon"
                          ? "bg-blue-600 text-white"
                          : "text-blue-600  hover:bg-blue-600  hover:text-white transition-all duration-150"
                      }`}
                      onClick={() => setTab("gallon")}
                    >
                      Gallon
                    </div>
                    <div
                      className={`cursor-pointer px-6 py-1 text-sm font-semibold border-2 rounded-full shadow border-blue-600  
                          ${
                            tab === "bottle"
                              ? "bg-blue-600 text-white"
                              : "text-blue-600  hover:bg-blue-600  hover:text-white transition-all duration-150"
                          }`}
                      onClick={() => setTab("bottle")}
                    >
                      Bottle
                    </div>
                  </div>
                </Tabs>

                <div className="w-full grid grid-cols-2 gap-3 p-2">
                  {isLoading
                    ? "Loading..."
                    : (tab === "gallon" ? gallons : bottles).map(
                        (item: any) => (
                          <Item_POS_Card
                            key={item._id}
                            tab={tab === "gallon" ? true : false}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            buy_price={item.buy_price}
                            img={item.img}
                          />
                        )
                      )}
                </div>
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
