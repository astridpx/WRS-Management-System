"use client";

import React, { use, useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { ReportColumns } from "./Reports-Column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableFilterDate } from "@/components/react-table/Main-Table-Date-Filter";
import { monitoringHistoryColumns } from "./POS-History-Column";
import ReportModalDetail from "./_components/Modal-Details";
import { useQuery, useQueries } from "react-query";
import { getTransactions, getAllExpenses } from "./services/Api";
import Loader from "@/components/loader/Spinner";
import { format } from "date-fns";
import { DailySalesReport } from "./helpers/Daily";
import { MonthlySalesReport } from "./helpers/Monthly";

export default function ReportPage() {
  const results = useQueries([
    {
      queryKey: ["sales, report"],
      queryFn: getTransactions,
      staleTime: 1000,
    },
    {
      queryKey: ["expenses, report"],
      queryFn: getAllExpenses,
      staleTime: 1000,
    },
  ]);
  const [saleData, setSaleData] = useState<any>([]);
  const [monthlySaleData, setMonthlySaleData] = useState<any>([]);

  const histoyData = results[0]?.data;
  const expensesData = results[1].data;

  const historyIsLoading = results[0].isSuccess;
  const expensesIsLoading = results[1].isSuccess;

  useEffect(() => {
    if (historyIsLoading && expensesIsLoading) {
      // Daily sales
      DailySalesReport(histoyData, expensesData)
        .then((SalesReport) => {
          setSaleData(SalesReport);
        })
        .catch((error) => {
          // Handle any errors here
          console.log(error);
        });
    }
  }, [expensesData, expensesIsLoading, historyIsLoading, histoyData]);

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
              {!historyIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={ReportColumns} data={saleData} />
              )}
            </TabsContent>
            <TabsContent value="history" className="relative overflow-x-hidden">
              {!historyIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTableFilterDate
                  columns={monitoringHistoryColumns}
                  data={histoyData}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
}
