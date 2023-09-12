import React from "react";
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

export const PRODModalAddItem = () => {
  const sho = true;
  return (
    <>
      <section
        className={`${
          sho ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Add Item
            </h2>
            <div className="flex gap-x-4">
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="item_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Item Name
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="item_name"
                      required
                      placeholder="Enter  item name"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <Select name="type" defaultValue="deliver">
                      <SelectTrigger className="text-center ">
                        <SelectValue placeholder="Select Services" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="container">Container</SelectItem>
                          <SelectItem value="bottle">Bottle</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <Input type="number" name="price" min={0} required />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="buy"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Buy Price
                  </label>
                  <div className="mt-2">
                    <Input type="number" name="buy" min={0} required />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="reorder"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reorder Notif
                  </label>
                  <div className="mt-2">
                    <Input type="number" name="reorder" min={0} required />
                  </div>
                </div>
              </div>

              <div className="w-[20rem] grid place-content-center gap-y-4 p-4">
                <div className="border w-[10rem] h-[10rem] shadow-2xl rounded-lg">
                  <Image
                    src={NoImage}
                    alt="NoImage"
                    height={100}
                    width={100}
                    className="w-full h-full"
                  />
                </div>
                <Button
                  // variant="outline"
                  type="button"
                  // className="bg-red-500 hover:bg-red-600"
                >
                  Upload
                </Button>
              </div>
            </div>
            {/* BUTTON FOOTER */}
            <div className=" flex justify-end space-x-4 mt-8 ">
              <Button
                variant="outline"
                type="button"
                // className="bg-red-500 hover:bg-red-600"
                // onClick={() => toggleShowCustomerForm(false)}
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
