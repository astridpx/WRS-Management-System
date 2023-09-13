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

async function getData() {
  const Data = fakeProductsData.map((d) => {
    return d;
  });

  return Data;
}

const DataGet = getData();

export default function ItemsPage() {
  const prodData = use(DataGet);
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
          <DataTable columns={productColumns} data={prodData} />
        </div>
      </PageWrapper>
    </>
  );
}
