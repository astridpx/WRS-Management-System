"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import addCustomerModalStore from "@/lib/zustand/CustomerPage-store/AddNew-Modal-store";
import { addNewUser } from "@/app/Customer/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cabuyao } from "@/utils/Brgy-Lists/Cabuyao-brgy";
import axios from "axios";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import Image from "next/image";

interface Item {
  item: string;
  borrowed: number;
}

export default function AddNewCustomer() {
  const queryClient = useQueryClient();
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["gallon"],
    queryFn: async () => {
      const { data } = await axios.get("/api/gallons");

      return data.data;
    },
  });
  const [item, setItem] = useState<Item[]>([]);

  const { toggleShowCustomerForm, showAddCustomerForm } =
    addCustomerModalStore();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    mobile1: "",
    mobile2: "",
    street: "",
    brgy: "",
    city: "",
    comment: "",
    address: "",
    isMain: true,
    item,
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
        street: "",
        brgy: "",
        city: "",
        comment: "",
        address: "",
        isMain: true,
        item,
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
      isMain,
      address,
      street,
      brgy,
      city,
    } = userData;

    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      mobile1.trim() === ""
    ) {
      return ErrorToast("This first name & last name & mobile1 is required");
    }

    if (isMain) {
      if (!street.length || !brgy.length || !city.length) {
        return ErrorToast("The field blk & lot & phase is required");
      }
    } else {
      if (address.trim() === "") {
        return ErrorToast("The field address is required");
      }
    }

    await userMutation.mutate({ ...userData });
  };

  const handleInputChange = (id: string, borrowedValue: number) => {
    // Find the index of the item with the matching id in the 'item' array
    const itemIndex = item.findIndex((item) => item.item === id);

    if (itemIndex !== -1) {
      // If the item with the same id exists, update its 'borrowed' property
      const updatedItem = { ...item[itemIndex], borrowed: borrowedValue };
      const updatedItemList = [...item];
      updatedItemList[itemIndex] = updatedItem;
      setItem(updatedItemList);
    } else {
      // If the item with the same id doesn't exist, create a new one
      const newItem = { item: id, borrowed: borrowedValue };
      setItem([...item, newItem]);
    }
  };

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      item: item,
    }));
  }, [item]);

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
                  ["isMain"]: e === "subd",
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
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="street"
                          required
                          placeholder="Enter street"
                          value={userData.street}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="brgy"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        BRGY
                      </label>
                      <div className="mt-2">
                        {/* <Input
                          type="text"
                          name="brgy"
                          required
                          placeholder="Enter brgy"
                          value={userData.brgy}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        /> */}
                        <Select
                          onValueChange={(e: any) =>
                            setUserData({
                              ...userData,
                              brgy: e,
                            })
                          }
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select brgy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <ScrollArea className="h-72">
                                <SelectLabel>BRGY Cabuyao Lists</SelectLabel>
                                {Cabuyao.map((d: string, index: number) => {
                                  return (
                                    <SelectItem key={index} value={d}>
                                      {d}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="sm:col-span-2 ">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="city"
                          required
                          defaultValue={"Cabuyao"}
                          placeholder="Enter city"
                          value={userData.city}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [e.target.name]: e.target.value,
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

                    {/* Borrowd gallon field */}
                    <div className="col-span-4 ">
                      <h2 className="font-semibold text-lg">Borrowed Gallon</h2>

                      <div>
                        <header className="h-8 grid grid-cols-4 gap-x-1 place-content-center text-center font-semibold bg-blue-600 text-slate-50">
                          <h4 className="text-sm ">#</h4>
                          <h4 className="text-sm col-span-2">ITEM</h4>
                          <h4 className="text-sm">WRS-GAL</h4>
                        </header>

                        {isLoading
                          ? "Loading .."
                          : data.map((d: any, index: number) => {
                              return (
                                <>
                                  <div
                                    key={d._id}
                                    className="mt-2 grid grid-cols-4 gap-x-1 place-content-center items-center "
                                  >
                                    <h5 className="text-center">
                                      {(index = index + 1)}
                                    </h5>
                                    <div className="text-sm col-span-2 flex items-center gap-x-2 place-self-center">
                                      <Image
                                        src={d.img}
                                        alt="Slim "
                                        height={30}
                                        width={30}
                                        unoptimized
                                        className="object-contain aspect-[4/3]"
                                      />
                                      <p>{d.name}</p>
                                    </div>
                                    <Input
                                      type="number"
                                      min={0}
                                      value={
                                        item.find((it) => it.item === d._id)
                                          ?.borrowed
                                      }
                                      defaultValue={0}
                                      onChange={(e) => {
                                        // setItem({
                                        //   ...item,
                                        //   borrowed: parseFloat(e.target.value),
                                        // });
                                        handleInputChange(
                                          d._id,
                                          parseFloat(e.target.value)
                                        );
                                      }}
                                      className="outline-none h-max py-1 text-center"
                                    />
                                  </div>
                                </>
                              );
                            })}
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

                    {/* Borrowd gallon field */}
                    <div className="col-span-4 ">
                      <h2 className="font-semibold text-lg">Borrowed Gallon</h2>

                      <div>
                        <header className="h-8 grid grid-cols-4 gap-x-1 place-content-center text-center font-semibold bg-blue-600 text-slate-50">
                          <h4 className="text-sm ">#</h4>
                          <h4 className="text-sm col-span-2">ITEM</h4>
                          <h4 className="text-sm">WRS-GAL</h4>
                        </header>

                        {isLoading
                          ? "Loading .."
                          : data.map((d: any, index: number) => {
                              return (
                                <>
                                  <div
                                    key={d._id}
                                    className="mt-2 grid grid-cols-4 gap-x-1 place-content-center items-center "
                                  >
                                    <h5 className="text-center">
                                      {(index = index + 1)}
                                    </h5>
                                    <div className="text-sm col-span-2 flex items-center gap-x-2 place-self-center">
                                      <Image
                                        src={d.img}
                                        alt="Slim "
                                        height={30}
                                        width={30}
                                        unoptimized
                                        className="object-contain aspect-[4/3]"
                                      />
                                      <p>{d.name}</p>
                                    </div>
                                    <Input
                                      type="number"
                                      min={0}
                                      value={
                                        item.find((it) => it.item === d._id)
                                          ?.borrowed
                                      }
                                      defaultValue={0}
                                      onChange={(e) => {
                                        // setItem({
                                        //   ...item,
                                        //   borrowed: parseFloat(e.target.value),
                                        // });
                                        handleInputChange(
                                          d._id,
                                          parseFloat(e.target.value)
                                        );
                                      }}
                                      className="outline-none h-max py-1 text-center"
                                    />
                                  </div>
                                </>
                              );
                            })}
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
