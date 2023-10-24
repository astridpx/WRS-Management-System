"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slim from "@/assets/items_img/slim_gallon.png";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdLocationPin, MdContactEmergency } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { returnGallon } from "../services/Apis";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient } from "react-query";

export default function POSModalReturnGallon() {
  const queryClient = useQueryClient();
  const { showReturnGallon, toggleShowReturn, customer } = POSBTNHeaderStore();
  const [returnGal, setReturnGal] = useState<any[]>([]);

  const person = Array.isArray(customer) ? customer.map((d) => d) : customer;

  const { mutateAsync } = useMutation({
    mutationFn: () => returnGallon({ item: returnGal }, person._id),
    onMutate: () => {
      toggleShowReturn(false);

      LoadingToast("Update pending...");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setReturnGal([]);

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

  const handleInputChange = (id: string, returnVal: number) => {
    // Find the index of the item with the matching id in the 'returnGal' array
    const itemIndex = returnGal.findIndex(
      (returnItem: any) => returnItem.itemId === id
    );

    if (itemIndex !== -1) {
      // If the item with the same id exists, update its 'returnQty' property
      const updatedItemList = [...returnGal]; // Create a new array copy
      updatedItemList[itemIndex].returnQty = returnVal; // Update the returnQty property
      setReturnGal(updatedItemList); // Update the state
    } else {
      // If the item with the same id doesn't exist, create a new one
      const newItem = { itemId: id, returnQty: returnVal };
      setReturnGal([...returnGal, newItem]); // Add the new item to the state
    }
  };

  return (
    <>
      <section
        className={`${
          showReturnGallon ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-3xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <h1 className="mb-4 font-semibold text-gray-900  ml-4 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Return Gallon
            </h1>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="">
                <div className="bg-blue-600  text-slate-50 font-semibold grid grid-cols-4 items-center px-4">
                  <h1>No</h1>
                  <h1 className="col-span-">ITEM</h1>
                  <h1>QTY</h1>
                  <h1>RETURN</h1>
                </div>

                {Array.isArray(person?.borrowed_gal)
                  ? person?.borrowed_gal?.map((gal: any, index: number) => {
                      return (
                        <>
                          <div
                            key={gal.item._id}
                            className="grid grid-cols-4 items-center py-2 gap-x-1 px-4 bg-slate-100"
                          >
                            <h1>{index + 1}</h1>
                            <div className="text-sm col-span- flex items-center gap-x-2">
                              <Image
                                src={gal.item.img}
                                alt="Container"
                                height={30}
                                width={30}
                                unoptimized
                                className="object-contain aspect-[4/3]"
                              />
                              <p>{gal.item.name}</p>
                            </div>
                            <p>
                              {gal.borrowed}-{gal.item.name}
                            </p>

                            <Input
                              type="number"
                              value={
                                returnGal.find(
                                  (it) => it.item === gal?.item?._id
                                )?.borrowed
                              }
                              min={0}
                              max={gal.borrowed}
                              className=" text-sm text-center outline-none border border-gray-500 w-24 py-0 "
                              onChange={(e) => {
                                handleInputChange(
                                  gal.item._id,
                                  parseInt(e.target.value)
                                );
                              }}
                            />
                          </div>
                        </>
                      );
                    })
                  : "No Borrowed Item"}
              </div>

              {/* BUTTON FOOTER */}
              <div className=" flex justify-end space-x-4 mt-8">
                <Button
                  variant="outline"
                  type="button"
                  // className="bg-red-500 hover:bg-red-600"
                  onClick={() => toggleShowReturn(false)}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  // className="bg-blue-500 hover:bg-blue-600"
                >
                  Return
                </Button>
              </div>
            </form>
          </main>
        </div>
      </section>
    </>
  );
}
