"use client";

import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import fakeProductsData from "@/utils/table-data/MOCK_PRODUCTS_DATA .json";
import { DataTable } from "@/components/react-table/main-table";
import { productColumns } from "./ITEMS-column";
import { Button } from "@/components/ui/button";
import { ItemsModalAdd } from "./_components/ITEMS-Modal-Add";
import { ItemsPageModalStore } from "@/lib/zustand/ItemsPage-store/Modals";
import { ItemsModalEdit } from "./_components/ITEMS-Modal-Edit";
import { getAllItems } from "./services/Item-Api";
import { useQuery } from "react-query";
import Loader from "@/components/loader/Spinner";

export default function ItemsPage() {
  const {
    isLoading,
    isError,
    data: allItems,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

  const { toggleAddItemModal } = ItemsPageModalStore();

  return (
    <>
      <ItemsModalAdd />
      <ItemsModalEdit />

      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end ">
            <Button
              onClick={() => toggleAddItemModal(true)}
              className="dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400"
            >
              Add New
            </Button>
          </div>
          {isLoading ? (
            <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
              <Loader />
              <p className="text-gray-400 ">Loading...</p>
            </div>
          ) : (
            <DataTable columns={productColumns} data={allItems} />
          )}
        </div>
      </PageWrapper>
    </>
  );
}
