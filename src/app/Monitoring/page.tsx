"use client";

import { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { LastGallonReturnColumns } from "./Last-Gallon-Return-Column";
import { CreditsColumns } from "./Credit-Column";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueries } from "react-query";
import Loader from "@/components/loader/Spinner";
import { getAllCredits, getLastReturn } from "./services/Api";

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

const DataGet = getData();

const MonitoringPage = () => {
  const results = useQueries([
    { queryKey: ["last_return"], queryFn: getLastReturn },
    { queryKey: ["credits"], queryFn: getAllCredits },
  ]);
  const monitoringData = use(DataGet);

  const lastReturnData = results[0]?.data;
  const creditsData = results[1]?.data;

  const lastReturnIsLoading = results[0].isLoading;
  const creditsIsLoading = results[1].isLoading;

  console.log(creditsData);

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
              {lastReturnIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable
                  columns={LastGallonReturnColumns}
                  data={lastReturnData}
                />
              )}
            </TabsContent>
            <TabsContent value="credit">
              {/* {creditsIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={CreditsColumns} data={monitoringData} />
                )} */}
              <DataTable columns={CreditsColumns} data={monitoringData} />
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default MonitoringPage;
