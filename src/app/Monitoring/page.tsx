// 'use client'

import { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { DataTableFilterDate } from "@/components/react-table/Main-Table-Date-Filter";
import { LastGallonReturnColumns } from "./Last-Gallon-Return-Column";
import { CreditsColumns } from "./Credit-Column";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData() {
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

//   const DataGet = getData();

const MonitoringPage = async () => {
  // const monitoringData = use(DataGet);
  const monitoringData = await getData();

  return (
    <>
      <PageWrapper>
        <div className="relative bg-white">
          <Tabs defaultValue="last_return" className="">
            <TabsList className="grid  grid-cols-3 w-[30rem]">
              <TabsTrigger value="last_return">Last Return</TabsTrigger>
              <TabsTrigger value="credit">Credit</TabsTrigger>
            </TabsList>

            <TabsContent value="last_return">
              <DataTable
                columns={LastGallonReturnColumns}
                data={monitoringData}
              />
            </TabsContent>
            <TabsContent value="credit">
              <DataTable columns={CreditsColumns} data={monitoringData} />
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default MonitoringPage;
