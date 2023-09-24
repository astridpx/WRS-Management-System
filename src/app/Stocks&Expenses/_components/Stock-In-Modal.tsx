"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import NoImage from "@/assets/noImage.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StocksModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Stocks-Modal";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/Date-Picker/Date-Picker";

export const StockModal = () => {
  const { stockModal, modalType, toggleStocksModal } = StocksModalStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const show = true;

  return (
    <>
      <section
        className={`${
          stockModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              {modalType === "in" ? " Stock In" : " Stock Out"}
            </h2>

            <div className="flex items-center w-full gap-x-4 mt-4">
              <div className="grid grid-cols-3 gap-x-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="qty"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </Label>
                  <Input type="text" name="qty" />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="reason"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reason
                  </Label>
                  <Select>
                    <SelectTrigger name="reason">
                      <SelectValue placeholder="Set A reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        <SelectItem value="consumed">Consumed</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </Label>
                  <DatePicker
                    calendar_width={"w-max"}
                    variant={"outline"}
                    setDate={setDate}
                    date={date}
                  />
                </div>
              </div>
              <div className="w-[20rem] grid place-content-center p-4">
                <div className="border w-[10rem] h-[10rem] shadow-2xl rounded-lg">
                  <Image
                    src={NoImage}
                    alt="NoImage"
                    height={100}
                    width={100}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON FOOTER */}
            <div className=" flex justify-end space-x-4 mt-8 ">
              <Button
                variant="outline"
                type="button"
                onClick={() => toggleStocksModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
