"use client";

import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { ReportColumns } from "./Reports-Column";
import fakeProductsData from "@/utils/table-data/MOCK_PRODUCTS_DATA .json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableFilterDate } from "@/components/react-table/Main-Table-Date-Filter";
import { monitoringHistoryColumns } from "./Monitoring-History-Column";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import ReportModalDetail from "./_components/Modal-Details";

async function getData() {
  const Data = fakeProductsData.map((d) => {
    return d;
  });

  return Data;
}
async function getData2() {
  const Data = await fakeCustomer.map((d: any) => {
    const data = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      address: `P-${d.phase} BLK-${d.blk}`,
    };

    return data;
  });

  return Data;
}

const DataGet = getData();
const DataGet2 = getData2();

export default function ReportPage() {
  const prodData = use(DataGet);
  const monitoringData = use(DataGet);

  return (
    <>
      <ReportModalDetail />

      <PageWrapper>
        <div className="relative bg-white">
          <Tabs defaultValue="sales_report" className="">
            <TabsList className="grid  grid-cols-2 w-[30rem]">
              <TabsTrigger value="sales_report">Sales Report</TabsTrigger>
              <TabsTrigger value="history">POS History</TabsTrigger>
            </TabsList>

            <TabsContent value="sales_report">
              <DataTable columns={ReportColumns} data={prodData} />
            </TabsContent>
            <TabsContent value="history">
              <DataTableFilterDate
                columns={monitoringHistoryColumns}
                data={monitoringData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
}
