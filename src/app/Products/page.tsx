import React from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import fakeProductsData from "@/utils/table-data/MOCK_PRODUCTS_DATA .json";
import { DataTable } from "@/components/react-table/main-table";
import { productColumns } from "./prod-column";
import { Button } from "@/components/ui/button";
import { PRODModalAddItem } from "../POS/PROD-Modal-Add-Item";

async function getData() {
  const Data = fakeProductsData.map((d) => {
    return d;
  });

  return Data;
}

export default async function ProductsPage() {
  const prodData = await getData();

  return (
    <>
      <PRODModalAddItem />
      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end ">
            <Button className="dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400">
              Add New
            </Button>
          </div>
          <DataTable columns={productColumns} data={prodData} />
        </div>
      </PageWrapper>
    </>
  );
}
