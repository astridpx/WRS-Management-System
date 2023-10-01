"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import addCustomerModalStore from "@/lib/zustand/CustomerPage-store/AddNew-Modal-store";
import { addNewUser } from "@/app/Customer/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";

export default function AddNewCustomer() {
  const queryClient = useQueryClient();
  const { toggleShowCustomerForm, showAddCustomerForm } =
    addCustomerModalStore();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    mobile1: "",
    mobile2: "",
    blk: 0,
    lot: 0,
    phase: 0,
    comment: "",
    address: "",
    isVillage: true,
  });
  const userMutation = useMutation({
    mutationFn: addNewUser,
    onMutate: () => {
      toggleShowCustomerForm(!showAddCustomerForm);
      LoadingToast("Add new customer is pending...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setUserData({
        first_name: "",
        last_name: "",
        mobile1: "",
        mobile2: "",
        blk: 0,
        lot: 0,
        phase: 0,
        comment: "",
        address: "",
        isVillage: true,
      });
      console.log("success bro!");
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      mobile1,
      isVillage,
      address,
      blk,
      lot,
      phase,
    } = userData;

    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      mobile1.trim() === ""
    ) {
      return ErrorToast("This first name & last name & mobile1 is required");
    }

    if (isVillage) {
      if (blk <= 0 || lot <= 0 || phase <= 0) {
        alert(isVillage);
        alert("hahah");
        return ErrorToast("The field blk & lot & phase is required");
      }
    } else {
      if (address.trim() === "") {
        return ErrorToast("The field address is required");
      }
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
            <Tabs
              defaultValue="subd"
              onValueChange={(e) =>
                setUserData({
                  ...userData,
                  ["isVillage"]: e === "subd",
                })
              }
            >
              <TabsList className="w-[20rem] mx-auto my-5 grid  grid-cols-2">
                <TabsTrigger value="subd">Subdivision</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              <TabsContent value="subd">
                <form action="" onSubmit={(e) => HandleSubmit(e)}>
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
                          value={userData.first_name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          value={userData.last_name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          disabled
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
                          value={userData.mobile1}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          placeholder="Enter mobile 2"
                          value={userData.mobile2}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="blk"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        BLK
                      </label>
                      <div className="mt-2">
                        <Input
                          type="number"
                          name="blk"
                          required
                          placeholder="Enter blk"
                          value={userData.blk}
                          min={0}
                          defaultValue={0}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: parseFloat(e.target.value),
                            });
                          }}
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
                          type="number"
                          name="lot"
                          required
                          placeholder="Enter lot"
                          value={userData.lot}
                          min={0}
                          defaultValue={0}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 ">
                      <label
                        htmlFor="phase"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phase
                      </label>
                      <div className="mt-2">
                        <Input
                          type="number"
                          name="phase"
                          required
                          placeholder="Enter phase"
                          value={userData.phase}
                          min={0}
                          defaultValue={0}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: parseFloat(e.target.value),
                            });
                          }}
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
                          name="comment"
                          placeholder="Enter alias or comments"
                          value={userData.comment}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                </form>
              </TabsContent>

              {/* Others Add customer */}
              <TabsContent value="other">
                <form action="" onSubmit={(e) => HandleSubmit(e)}>
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
                          value={userData.first_name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          value={userData.last_name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          // required
                          disabled
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
                          value={userData.mobile1}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          placeholder="Enter mobile 2"
                          value={userData.mobile2}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="address"
                          required
                          placeholder="Enter customer address"
                          value={userData.address}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          name="comment"
                          placeholder="Enter alias or comments"
                          value={userData.comment}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* BUTTON FOOTER */}
                  <div className=" flex justify-end space-x-4 mt-8">
                    <Button
                      variant="outline"
                      type="button"
                      // disabled={updateUserMutation?.isLoading}
                      onClick={() => toggleShowCustomerForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      // disabled={updateUserMutation?.isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </section>
    </>
  );
}
