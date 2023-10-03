"use client";

import { useState, useRef, useEffect } from "react";
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
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { updateExpenses } from "../services/Expenses-Api";

// HANDLE EXPENSE NAME / DROPDOWN
const handleExpenseName = (name: string) => {
  switch (name) {
    case "employee":
      return "Employee Salary";
    case "gas":
      return "Gas";
    case "seal":
      return "Seal";
    case "filter":
      return "Filter";
    default:
      return "";
  }
};

export const ExpensesModalEdit = () => {
  const queryClient = useQueryClient();
  const { editExpensesModal, toggleEditExpensesModal, editData } =
    ExpensesModalStore();
  const [item, setItem] = useState<keyof IImages>("other");
  const [disable, setDisable] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [date2, setDate2] = useState<Date | undefined>();
  const [expData, setExpData] = useState({
    _id: "",
    name: "",
    amount: 0,
    category: "",
    date,
  });

  useEffect(() => {
    setExpData({ ...editData });
    setDate(new Date(editData.date));
    setItem(editData.category as keyof IImages);
  }, [editData]);

  const clearForm = () => {
    setExpData({
      _id: "",
      name: "",
      amount: 0,
      category: "",
      date,
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: () => updateExpenses({ ...expData }, expData._id),
    onMutate: () => {
      clearForm();
      toggleEditExpensesModal(false);
      LoadingToast("Updating expenses...");
    },
    onSuccess: (data) => {
      DissmissToast();

      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutateAsync();
  };

  return (
    <>
      <section
        className={`${
          editExpensesModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Add Expenses
            </h2>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full  mt-4 flex gap-x-8">
                <div className="w-full space-y-8">
                  <Select
                    required
                    value={expData.category}
                    onValueChange={(e) => {
                      setExpData({
                        ...expData,
                        category: e,
                        name: handleExpenseName(e),
                      });
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
                        <SelectItem value="employee">
                          Employee Salary
                        </SelectItem>
                        <SelectItem value="seal">Seal</SelectItem>
                        <SelectItem value="filter">Filter</SelectItem>
                        <SelectItem value="other">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label htmlFor="other_expenses">Expenses Name</Label>
                    <Input
                      name="name"
                      type="text"
                      disabled={disable}
                      required={disable}
                      placeholder="Enter expenses"
                      value={disable ? "" : expData.name}
                      onChange={(e) =>
                        setExpData({
                          ...expData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-x-4">
                    <div className="space-y-2 ">
                      <Label htmlFor="amount" onClick={() => alert(date)}>
                        Total Value
                      </Label>
                      <Input
                        name="amount"
                        type="number"
                        placeholder="Enter value"
                        required
                        min={0}
                        value={expData.amount}
                        onChange={(e) =>
                          setExpData({
                            ...expData,
                            [e.target.name]: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 grid w-full ">
                      <Label className="w-full mb-2">Date</Label>
                      <DatePicker
                        calendar_width={"w-full"}
                        variant={"outline"}
                        setDate={(newDate) => {
                          setDate(newDate);
                          setExpData({
                            ...expData,
                            date: newDate as Date,
                          });
                        }}
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
                  onClick={() => {
                    toggleEditExpensesModal(false);
                    clearForm();
                  }}
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
            </form>
          </main>
        </div>
      </section>
    </>
  );
};
