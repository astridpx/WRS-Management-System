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
import { ItemsPageModalStore } from "@/lib/zustand/ItemsPage-store/Modals";
import { transpileModule } from "typescript";

export const Modal = () => {
  const { addItemModal, toggleAddItemModal } = ItemsPageModalStore();
  const show = true;

  return (
    <>
      <section
        className={`${
          show ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Add Expenses
            </h2>
          </main>
        </div>
      </section>
    </>
  );
};
