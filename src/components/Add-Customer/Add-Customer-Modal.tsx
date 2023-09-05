"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
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
import addCustomerModalStore from "@/lib/zustand/CustomerPage-store/AddNew-Modal-store";
import { addNewUser } from "@/app/Customer/APIs/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddNewCustomer() {
  const queryClient = useQueryClient();
  const { toggleShowCustomerForm, showAddCustomerForm } =
    addCustomerModalStore();
  const [userData, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    address: "",
    password: "",
  });

  const userMutation: any = useMutation({
    mutationFn: addNewUser,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setData({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        address: "",
        password: "",
      });
      toggleShowCustomerForm(!showAddCustomerForm);
      console.log("success bro!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const HandleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      userData.first_name.trim() === "" ||
      userData.last_name.trim() === "" ||
      userData.email.trim() === "" ||
      userData.gender.trim() === "" ||
      userData.address.trim() === "" ||
      userData.password.trim() === ""
    ) {
      return toast.error("All field must be filled up.");
    }

    await userMutation.mutate({ ...userData });
  };

  return (
    <>
      <section
        className={`${
          showAddCustomerForm ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Customer Personal Information
            </h2>

            {/* FORM TAB */}
            <Tabs defaultValue="subd">
              <TabsList className="w-[20rem] mx-auto my-5 grid  grid-cols-2">
                <TabsTrigger value="subd">Subdivision</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              <TabsContent value="subd">
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="first_name"
                        required
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="last_name"
                        required
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <Input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter  email"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mobile1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile 1
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="mobile1"
                        required
                        placeholder="Enter mobile 1"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mobile2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile 2
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="mobile2"
                        required
                        placeholder="Enter mobile 2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="phase"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phase
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="phase"
                        required
                        placeholder="Enter phase"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="blk"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      BLK
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="blk"
                        required
                        placeholder="Enter blk"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="lot"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lot
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="lot"
                        required
                        placeholder="Enter lot"
                      />
                    </div>
                  </div>

                  {/*  */}
                  <div className="col-span-full">
                    <label
                      htmlFor="alias"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Alias / Comments
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="alias"
                        required
                        placeholder="Enter alias or comments"
                      />
                    </div>
                  </div>
                </div>

                {/* BUTTON FOOTER */}
                <div className=" flex justify-end space-x-4 mt-8">
                  <Button
                    variant="outline"
                    type="button"
                    // className="bg-red-500 hover:bg-red-600"
                    onClick={() => toggleShowCustomerForm(false)}
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
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </section>
    </>
  );
}
