"use client";

import React from "react";
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

export default function POSReceipt() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      {/* <div className="h-[32rem] flex flex-col justify-between "> */}
      <div className="py-2">
        <div className="flex justify-between items-center px-2">
          <h4 className="font-semibold">Date</h4>
          {/* DATE PICKER */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <AiOutlineCalendar className="mr-2 h-4 w-4" />
                {date && format(date, "LLL dd, y")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("2022-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Separator />
        <h2 className="text-center my-2 text-gray-500">Order Summary</h2>
        <Separator />
        <div className="px-2 pb-4">
          <div className="grid grid-cols-3 py-2 font-semibold">
            <h1>Item</h1>
            <h1 className="text-center">QTY</h1>
            <h1 className="text-end">Price</h1>
          </div>

          <div className="grid grid-cols-3 py-2 ">
            <div className="text-sm flex items-center gap-x-2">
              <Image src={Slim} alt="Slim " height={25} className="" />
              <p>Slim</p>
            </div>
            <h2 className="text-center">6</h2>
            <h2 className="text-end">120.00</h2>
          </div>
          <div className="grid grid-cols-3 py-2 ">
            <div className="text-sm flex items-center gap-x-2">
              <Image src={Rounded} alt="Slim " height={25} className="" />
              <p>Slim</p>
            </div>
            <h2 className="text-center">6</h2>
            <h2 className="text-end">120.00</h2>
          </div>
        </div>

        {/* bottom amount */}
        <Separator />
        <div className="grid grid-cols-3 p-2">
          <h1>Total</h1>
          <h1 className="text-center">12</h1>
          <h1 className="text-end">240.00</h1>
        </div>
      </div>

      {/* SUB TOTAL */}
      <footer className="">
        <div className="space-y-4 ">
          <Separator />
          <div className="flex justify-between px-2">
            <h1 className="font-semibold text-xl">SUB TOTAL</h1>
            <h1 className="text-xl">P 0.00</h1>
          </div>
          <Separator />
          <div className="flex justify-center pb-4">
            <Button className="">Confirm Payment</Button>
          </div>
        </div>
      </footer>
      {/* </div> */}
    </>
  );
}
