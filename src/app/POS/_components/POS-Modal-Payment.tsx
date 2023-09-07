"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

export const PaymentModal = () => {
  const { paymentModal, togglePaymentModal } = POSPaymentModal();

  return (
    <>
      <section
        className={`${
          paymentModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-2xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <div className="flex justify-between ">
              <h1 className="mb-4 font-semibold text-gray-900  ml-4 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Confirm Payment
              </h1>
              <IoClose
                size={22}
                className="place-self-start align-top cursor-pointer text-gray-500"
                onClick={() => togglePaymentModal(false)}
              />
            </div>

            <div className="flex justify-center">
              <form className=" w-[80%] font-semibold">
                <section className="py-2 bg-gray-200 space-y-2 mb-4">
                  <div className="flex justify-between px-4">
                    <h1>Sub Total</h1>
                    <h1>P 100.00</h1>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Sub Total</h1>
                    <Input
                      type="number"
                      placeholder=""
                      min={0}
                      defaultValue={0}
                      className="w-[50%] py-1 text-center"
                    />
                  </div>
                </section>

                <section className="py-2 bg-gray-200 space-y-2 mb-4">
                  <div className="flex justify-between px-4">
                    <h1>Total Due</h1>
                    <h1>P 100.00</h1>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Cash</h1>
                    <Input
                      type="number"
                      placeholder=""
                      min={0}
                      defaultValue={0}
                      className="w-[50%] py-1 text-center"
                    />
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Changed</h1>
                    <h1 className="w-[50%] py-2 bg-green-100 text-center">
                      P 100.00
                    </h1>
                  </div>
                </section>

                <div className="w-full flex justify-end">
                  <Button>Submit Payment</Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
