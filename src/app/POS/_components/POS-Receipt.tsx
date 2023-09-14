"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import Slim from "@/assets/items_img/slim_gallon.png";
import Rounded from "@/assets/items_img/rounded_gallon.png";
import Image from "next/image";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";
import { Orders } from "../../../../typings";
import { DatePicker } from "@/components/Date-Picker/Date-Picker";

export default function POSReceipt() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { togglePaymentModal, order, payment } = POSPaymentModal();

  return (
    <>
      {/* <div className="h-[32rem] flex flex-col justify-between "> */}
      <div className="py-2">
        <div className="flex justify-between items-center px-2">
          <h4 className="font-semibold">Date</h4>
          {/* DATE PICKER */}
          <DatePicker
            calendar_width={"w-max"}
            variant={"ghost"}
            setDate={setDate}
            date={date}
          />
        </div>
        <Separator />
        <h2 className="text-center my-2 text-gray-500">Order Summary</h2>
        <Separator />
        <div className="px-2 pb-4 min-h-[10rem]">
          <div className="grid grid-cols-3 py-2 font-semibold border-b">
            <h1>Item</h1>
            <h1 className="text-center">QTY</h1>
            <h1 className="text-end">Price</h1>
          </div>

          {order.map((orders: Orders) => {
            return (
              <>
                <div key={orders.id} className="grid grid-cols-3 py-2 ">
                  <div className="text-sm flex items-center gap-x-2">
                    {orders.img && (
                      <Image
                        src={orders.img}
                        alt="Slim "
                        height={25}
                        className=""
                      />
                    )}
                    <p>{orders.type}</p>
                  </div>
                  <h2 className="text-center">{orders.qty}</h2>
                  <h2 className="text-end">{orders.price?.toFixed(2)}</h2>
                </div>
              </>
            );
          })}
        </div>

        {/* bottom amount */}
        <Separator />
        <div className="grid grid-cols-3 p-2">
          <h1>Total</h1>
          <h1 className="text-center">
            {order.reduce((accumulator, currentOrder) => {
              return accumulator + currentOrder?.qty;
            }, 0)}
          </h1>
          <h1 className="text-end">{payment.toFixed(2)}</h1>
        </div>
      </div>

      {/* SUB TOTAL */}
      <footer className="">
        <div className="space-y-4 ">
          <Separator />
          <div className="flex justify-between px-2">
            <h1 className="font-semibold text-xl">SUB TOTAL</h1>
            <h1 className="text-xl">₱{payment.toFixed(2)}</h1>
          </div>
          <Separator />
          <div className="flex justify-center pb-4">
            <Button className="" onClick={() => togglePaymentModal(true)}>
              Confirm Payment
            </Button>
          </div>
        </div>
      </footer>
      {/* </div> */}
    </>
  );
}
