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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { stockIn, stockOut } from "../services/Stock-Api";

export const StockModal = () => {
  const queryClient = useQueryClient();
  const { stockModal, itemId, modalType, img, toggleStocksModal } =
    StocksModalStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState({
    worth: 0,
    qty: 0,
    transaction: "",
    date,
  });

  const clearForm = () => {
    setData({
      worth: 0,
      qty: 0,
      transaction: "",
      date,
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const res =
        modalType === "in"
          ? await stockIn({ ...data }, itemId)
          : await stockOut({ ...data }, itemId);

      return res;
    },
    onMutate: () => {
      clearForm();
      toggleStocksModal(false);
      LoadingToast("Modifying stocks...");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stocks, items"],
      });
      DissmissToast();
      SuccessToast(data?.message);
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
          stockModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              {modalType === "in" ? " Stock In" : " Stock Out"}
            </h2>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex items-center w-full gap-x-4 mt-4">
                <Tabs value={modalType === "in" ? "in" : "out"}>
                  <TabsContent value="in">
                    <div className="grid grid-cols-3 gap-x-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="worth"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Price
                        </Label>
                        <Input
                          type="number"
                          name="worth"
                          required
                          min={0}
                          placeholder="Enter price"
                          value={data.worth}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="qty"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          name="qty"
                          required
                          min={0}
                          placeholder="Enter qty"
                          value={data.qty}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: parseFloat(e.target.value),
                            })
                          }
                        />
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
                  </TabsContent>

                  <TabsContent value="out">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label
                          htmlFor="worth"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Price
                        </Label>
                        <Input
                          type="number"
                          name="worth"
                          required
                          min={0}
                          placeholder="Enter price"
                          value={data.worth}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="qty"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          name="qty"
                          required
                          min={0}
                          placeholder="Enter qty"
                          value={data.qty}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="transaction"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Transacion
                        </Label>
                        <Select
                          required={modalType === "out"}
                          onValueChange={(e) =>
                            setData({ ...data, transaction: e })
                          }
                        >
                          <SelectTrigger name="transaction">
                            <SelectValue placeholder="Set A Transaction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="consumed">Consumed</SelectItem>
                              <SelectItem value="damaged">Damaged</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor=""
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Date
                        </Label>
                        <DatePicker
                          calendar_width={"w-full"}
                          variant={"outline"}
                          setDate={setDate}
                          date={date}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="w-[20rem] grid place-content-center p-4">
                  <div className="border w-[10rem] h-[10rem] shadow-2xl rounded-lg">
                    <Image
                      src={img ? img : NoImage}
                      alt="NoImage"
                      height={100}
                      width={100}
                      unoptimized
                      className="h-full w-full object-contain aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>

              {/* BUTTON FOOTER */}
              <div className=" flex justify-end space-x-4 mt-8 ">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    toggleStocksModal(false);
                    clearForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </main>
        </div>
      </section>
    </>
  );
};
