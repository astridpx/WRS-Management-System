"use client";

import React from "react";
import Image from "next/image";
import Slim from "@/assets/items_img/slim_gallon.png";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { Button } from "@/components/ui/button";

export default function POSModalReturnGallon() {
  const { showReturnGallon, toggleShowReturn } = POSBTNHeaderStore();

  return (
    <>
      <section
        className={`${
          showReturnGallon ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <h1 className="mb-4 font-semibold text-gray-900  ml-4 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Return Gallon
            </h1>

            <div className="">
              <div className="bg-sky-500 font-semibold grid grid-cols-6 items-center place-content-center place-items-center">
                <h1>No</h1>
                <h1 className="col-span-2">ITEM</h1>
                <h1>CLIENT-GAL</h1>
                <h1>WRS-GAL</h1>
                <h1>QUANTITY</h1>
              </div>

              <div className="grid grid-cols-6 items-center py-2 gap-x-1 place-content-center place-items-center">
                <h1>1</h1>
                <div className="text-sm col-span-2 flex items-center gap-x-2">
                  <Image src={Slim} alt="Slim " height={25} className="" />
                  <p>Slim</p>
                </div>
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500  py-1 w-16 "
                />
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500 py-1 w-16 "
                />
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500 py-1 w-16 "
                />
              </div>
              <div className="grid grid-cols-6 items-center py-2 gap-x-1 place-content-center place-items-center">
                <h1>1</h1>
                <div className="text-sm col-span-2 flex items-center gap-x-2">
                  <Image src={Slim} alt="Slim " height={25} className="" />
                  <p>Slim</p>
                </div>
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500  py-1 w-16 "
                />
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500 py-1 w-16 "
                />
                <input
                  type="number"
                  min={0}
                  className=" text-sm text-center outline-none border border-gray-500 py-1 w-16 "
                />
              </div>
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
          </main>
        </div>
      </section>
    </>
  );
}
