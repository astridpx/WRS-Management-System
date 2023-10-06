"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient } from "react-query";
import { updateItem } from "../services/Item-Api";
import "@uploadthing/react/styles.css";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export const ItemsModalEdit = () => {
  const queryClient = useQueryClient();
  const { editData, setClearState, editItemModal, toggleEditItemModal } =
    ItemsPageModalStore();
  const InputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState({
    _id: null,
    name: "",
    img: "",
    category: "",
    reorder: 0,
    pos_item: false,
    price: 0,
    buy_price: 0,
  });
  const [uploading, setUploading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      updateItem(
        {
          ...data,
        },
        data._id
      ),
    onMutate: () => {
      setClearState();
      toggleEditItemModal(false);
      setData({
        _id: null,
        name: "",
        img: "",
        category: "",
        reorder: 0,
        pos_item: false,
        price: 0,
        buy_price: 0,
      });

      LoadingToast("Update pending...");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });

      DissmissToast();
      SuccessToast(data?.message);
    },
    onError: (error: any) => {
      DissmissToast();

      ErrorToast(error?.response?.data?.message);
    },
  });

  // SET THE DATA FROM STATE MANAGEMNT IN A STATE VARIABLE
  useEffect(() => {
    setData({ ...editData });
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <>
      <section
        className={`${
          editItemModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Edit Item Detail
            </h2>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex gap-x-4">
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="item_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Item Name
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter item name"
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* SECOND FIELD GROUP */}
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <Select
                        name="category"
                        required
                        value={data.category}
                        onValueChange={(e) => setData({ ...data, category: e })}
                      >
                        <SelectTrigger className="text-center ">
                          <SelectValue
                            placeholder="Select Category"
                            className="placeholder:text-sm placeholder:text-slate-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Category</SelectLabel>
                            <SelectItem value="container">Container</SelectItem>
                            <SelectItem value="bottle">Bottle</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pos_item"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      POS Item
                    </label>
                    <div className="mt-2">
                      <Select
                        name="pos_item"
                        required
                        value={data.pos_item === true ? "yes" : "no"}
                        onValueChange={(e) =>
                          setData({
                            ...data,
                            pos_item: e === "yes" ? true : false,
                          })
                        }
                      >
                        <SelectTrigger className="text-center ">
                          <SelectValue
                            placeholder="Is this sellable"
                            className="placeholder:text-sm placeholder:text-slate-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="reorder"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Reorder Level
                    </label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        name="reorder"
                        min={0}
                        required
                        placeholder="Enter level"
                        value={data.reorder}
                        onChange={(e) =>
                          setData({
                            ...data,
                            [e.target.name]: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* 3RD FIELD GROUP */}
                  <div className="sm:col-span-3 sm:col-start-1">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        name="price"
                        min={0}
                        required={data.pos_item}
                        disabled={!data.pos_item}
                        placeholder="Enter price"
                        value={data.price}
                        onChange={(e) =>
                          setData({
                            ...data,
                            [e.target.name]: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="buy"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Buy Price
                    </label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        name="buy_price"
                        min={0}
                        required={data.pos_item}
                        disabled={!data.pos_item}
                        placeholder="Enter buy price"
                        value={data.buy_price}
                        onChange={(e) =>
                          setData({
                            ...data,
                            [e.target.name]: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[20rem] grid place-content-center gap-y-4 p-4">
                  <div className="border w-[10rem] h-[10rem] shadow-2xl rounded-lg">
                    <Image
                      src={data.img ? data.img : NoImage}
                      alt="NoImage"
                      height={100}
                      width={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      // Do something with the response
                      setUploading(false);
                      setData({ ...data, img: res[0].fileUrl });
                    }}
                    onUploadProgress={(e) => {
                      setUploading(true);
                    }}
                    onUploadError={(error: Error) => {
                      setUploading(false);
                      // Do something with the error.
                      ErrorToast(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>

              {/* BUTTON FOOTER */}
              <div className=" flex justify-end space-x-4 mt-8 ">
                <Button
                  variant="outline"
                  type="button"
                  disabled={uploading}
                  // className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    setClearState();
                    toggleEditItemModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={uploading}
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
