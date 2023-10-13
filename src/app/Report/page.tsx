"use client";

import React, { use, useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { ReportColumns } from "./Reports-Column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableFilterDate } from "@/components/react-table/Main-Table-Date-Filter";
import { monitoringHistoryColumns } from "./Monitoring-History-Column";
import ReportModalDetail from "./_components/Modal-Details";
import { useQuery } from "react-query";
import { getTransactions } from "./services/Api";
import Loader from "@/components/loader/Spinner";
import { format } from "date-fns";

// SALES REPORT DATA
const salesReport = async (dataHistory: any) => {
  // get alldates and format
  const formatDate = await dataHistory.map((data: any) => {
    const dates = format(new Date(data.date), "LLL dd, y");
    return dates;
  });

  const uniqueDates = Array.from(new Set(formatDate)); // remove duplicates dates

  // mapp the all unique dates
  // the filter the dates that match
  // then compute the total of discount, profit or amount and balance
  const salesData = await uniqueDates.map((udate: any) => {
    const filter = dataHistory.filter(
      (filDate: any) => format(new Date(filDate.date), "LLL dd, y") === udate
    );
    const totalAmount = filter.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );
    const totalDiscount = filter.reduce(
      (acc: any, transaction: any) => acc + transaction.discount,
      0
    );
    const totalBalance = filter.reduce(
      (acc: any, transaction: any) => acc + transaction.balance,
      0
    );

    const newData = {
      Date: udate,
      tProfit: totalAmount,
      tDiscount: totalDiscount,
      tBalance: totalBalance,
    };

    return newData;
  });

  return salesData;
};

export default function ReportPage() {
  const {
    isLoading,
    data: history,
    isSuccess,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  const [saleData, setSaleData] = useState<any>([]);

  useEffect(() => {
    if (isSuccess) {
      salesReport(history)
        .then((SalesReport) => {
          setSaleData(SalesReport);
        })
        .catch((error) => {
          // Handle any errors here
          console.log(error);
        });
    }
  }, [isSuccess, history]);

  return (
    <>
      <ReportModalDetail />

      <PageWrapper>
        <div className="relative bg-white ">
          <Tabs defaultValue="sales_report" className="">
            <TabsList className="grid  grid-cols-2 w-[30rem]">
              <TabsTrigger value="sales_report">Sales Report</TabsTrigger>
              <TabsTrigger value="history">POS History</TabsTrigger>
            </TabsList>

            <TabsContent
              value="sales_report"
              className="relative overflow-x-hidden"
            >
              {!isSuccess ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={ReportColumns} data={saleData} />
              )}
            </TabsContent>
            <TabsContent value="history" className="relative overflow-x-hidden">
              {!isSuccess ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTableFilterDate
                  columns={monitoringHistoryColumns}
                  data={history}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
}
