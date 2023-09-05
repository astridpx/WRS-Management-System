"use client";

import React from "react";
import Image from "next/image";
import Slim from "@/assets/items_img/slim_gallon.png";
import { IoClose } from "react-icons/io5";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";

export default function POSModalReturnGallon() {
  const { showReturnGallon, toggleShowReturn } = POSBTNHeaderStore();

  const show = true;
  return (
    <>
      <section
        className={`${
          showReturnGallon ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <div className="flex justify-between ">
              <h1 className="mb-4 font-semibold text-gray-900 relative ml-4 before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Return Gallon
              </h1>
              <IoClose
                size={22}
                className="place-self-start align-top cursor-pointer text-gray-500"
                onClick={() => toggleShowReturn(false)}
              />
            </div>

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
          </main>
        </div>
      </section>
    </>
  );
}
