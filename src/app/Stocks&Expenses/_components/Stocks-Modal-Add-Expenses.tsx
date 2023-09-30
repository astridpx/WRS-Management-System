"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/Date-Picker/Date-Picker";
import { ExpensesModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Expenses-Modal";
import { IImages } from "../../../../typings";
import { ExpenseImages } from "@/utils/Stock&Expenses-img/img-category";

export const StocksModalAddExpenses = () => {
  const { addExpensesModal, toggleAddExpensesModal } = ExpensesModalStore();
  const [item, setItem] = useState<keyof IImages>("other");
  const [disable, setDisable] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <section
        className={`${
          addExpensesModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Add Expenses
            </h2>

            <div className="w-full  mt-4 flex gap-x-8">
              <div className="w-full space-y-8">
                <Select
                  required
                  onValueChange={(e) => {
                    setItem(e as keyof IImages);
                    setDisable(e === "other" ? false : true);
                  }}
                >
                  <SelectTrigger className="text-center bg-white">
                    <SelectValue placeholder="Select type of expenses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose Expenses</SelectLabel>
                      <SelectItem value="gas">Gas</SelectItem>
                      <SelectItem value="employee">Employee Salary</SelectItem>
                      <SelectItem value="seal">Seal</SelectItem>
                      <SelectItem value="filter">Filter</SelectItem>
                      <SelectItem value="other">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <Label htmlFor="other_expenses">Expenses Name</Label>
                  <Input
                    name="other_expenses"
                    disabled={disable}
                    type="text"
                    placeholder="Enter expenses"
                  />
                </div>

                <div className="grid grid-cols-2 w-full gap-x-4">
                  <div className="space-y-2 ">
                    <Label htmlFor="amount">Total Value</Label>
                    <Input
                      name="amount"
                      type="number"
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="space-y-2 grid w-full ">
                    <Label className="w-full mb-2">Date</Label>
                    <DatePicker
                      calendar_width={"w-full"}
                      variant={"outline"}
                      setDate={setDate}
                      date={date}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[30rem]  h-[18rem] ">
                <h1 className="text-center mb-2 font-semibold">Preview</h1>
                <figure className="w-[80%]  h-[75%] rounded-lg shadow-xl mx-auto overflow-hidden flex items-center justify-center cursor-pointer bg-slate-200">
                  <Image
                    src={ExpenseImages[item]}
                    alt="image"
                    height={150}
                    width={150}
                    className="w-full h-full"
                  />
                </figure>
              </div>
            </div>

            {/* BUTTON FOOTER */}
            <div className=" flex justify-end space-x-4 mt-8 ">
              <Button
                variant="outline"
                type="button"
                onClick={() => toggleAddExpensesModal(false)}
                // className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // className="bg-blue-500 hover:bg-blue-600"
              >
                Save
              </Button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
