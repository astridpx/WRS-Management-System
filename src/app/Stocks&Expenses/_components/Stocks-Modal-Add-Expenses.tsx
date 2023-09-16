"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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
import { ExpensesModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Expenses-Modal";

export const StocksModalAddExpenses = () => {
  const { addExpensesModal, toggleAddExpensesModal } = ExpensesModalStore();

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
                <Select required>
                  <SelectTrigger className="text-center bg-white">
                    <SelectValue placeholder="Select type of expenses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose Expenses</SelectLabel>
                      <SelectItem value="gas">Gas</SelectItem>
                      <SelectItem value="salary">Employee Salary</SelectItem>
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
                    type="text"
                    placeholder="Enter expenses"
                  />
                </div>

                <div className="flex w-full gap-x-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Total Value</Label>
                    <Input
                      name="amount"
                      type="number"
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other_expenses">Date</Label>
                    <Input
                      name="other_expenses"
                      type="text"
                      placeholder="Enter expenses"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[30rem] bg-green-300">Image Here</div>
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
