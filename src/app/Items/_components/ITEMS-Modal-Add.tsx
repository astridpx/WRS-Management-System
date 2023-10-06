"use client";

import { useState } from "react";
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
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { createItem } from "../services/Item-Api";
import "@uploadthing/react/styles.css";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { utapi } from "uploadthing/server";

export const ItemsModalAdd = () => {
  const queryClient = useQueryClient();
  const { addItemModal, toggleAddItemModal } = ItemsPageModalStore();
  const [image, setImage] = useState("");
  const [itemData, setItemData] = useState({
    name: "",
    img: "",
    category: "",
    reorder: 0,
    pos_item: false,
    price: 0,
    buy_price: 0,
  });
  const [uploading, setUploading] = useState(false);

  const clearForm = () => {
    setItemData({
      name: "",
      img: "",
      category: "",
      reorder: 0,
      pos_item: false,
      price: 0,
      buy_price: 0,
    });
    setImage("");
  };

  const { mutateAsync } = useMutation({
    mutationFn: createItem,
    onMutate: () => {
      toggleAddItemModal(false);
      clearForm();
      LoadingToast("Creating new item...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!itemData.img.length) return ErrorToast("Item image is required");

    await mutateAsync({ ...itemData });
  };

  return (
    <>
      <section
        className={`${
          addItemModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Add Item
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
                        placeholder="Enter  item name"
                        value={itemData.name}
                        onChange={(e) =>
                          setItemData({
                            ...itemData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* SECOND FIELD GROUP */}
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      onClick={() => console.log({ ...itemData })}
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <Select
                        name="category"
                        required
                        onValueChange={(e) =>
                          setItemData({ ...itemData, category: e })
                        }
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
                        value={itemData.pos_item ? "yes" : "no"}
                        onValueChange={(e) => {
                          setItemData({
                            ...itemData,
                            pos_item: e === "yes" ? true : false,
                          });
                        }}
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
                        value={itemData.reorder}
                        onChange={(e) =>
                          setItemData({
                            ...itemData,
                            [e.target.name]: e.target.value,
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
                        required={itemData.pos_item}
                        disabled={!itemData.pos_item}
                        placeholder="Enter price"
                        value={itemData.price}
                        onChange={(e) =>
                          setItemData({
                            ...itemData,
                            [e.target.name]: e.target.value,
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
                        required={itemData.pos_item}
                        disabled={!itemData.pos_item}
                        placeholder="Enter buy price"
                        value={itemData.buy_price}
                        onChange={(e) =>
                          setItemData({
                            ...itemData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[20rem] grid place-content-center gap-y-4 p-4">
                  <div className="border w-[10rem] h-[10rem] shadow-2xl rounded-lg">
                    <Image
                      src={image ? image : NoImage}
                      alt="NoImage"
                      height={100}
                      width={50}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      // Do something with the response
                      setUploading(false);
                      setImage(res[0].fileUrl);
                      setItemData({ ...itemData, img: res[0].fileUrl });
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
                  onClick={() => {
                    toggleAddItemModal(false);
                    clearForm();
                  }}
                >
                  Cancel
                </Button>

                <Button disabled={uploading} type="submit">
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
