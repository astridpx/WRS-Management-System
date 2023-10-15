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

// SALES REPORT DATA
const salesReport = async (dataHistory: any, expenseHistory: any) => {
  // get alldates and format
  const formatDate = await dataHistory.map((data: any) => {
    const dates = format(new Date(data.date), "LLL dd, y");
    return dates;
  });

  const getExpDate = await expenseHistory.map((data: any) => {
    return data.sort_date;
  });

  // merge history dates and expenses dates
  const mergedDates = [...formatDate, ...getExpDate];

  const allDates = Array.from(new Set(mergedDates)); // remove duplicates dates from combine dates

  // map the combine unique dates
  // the filter the dates that match
  // then compute the total of discount, profit or amount and balance
  const salesData = await allDates.map((udate: any) => {
    const filtered = dataHistory.filter(
      (filDate: any) => format(new Date(filDate.date), "LLL dd, y") === udate
    );
    const filteredExp = expenseHistory.filter(
      (filDate: any) => filDate.sort_date === udate
    );

    const totalAmount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );
    const totalDiscount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.discount,
      0
    );
    const totalBalance = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.balance,
      0
    );

    // variable for total order gallon and bottle
    let GalQty = 0;
    let BottleQty = 0;

    // Total Gallon computation
    filtered.forEach((order: any) => {
      // Iterate through each order in the "orders" array
      order.orders.forEach((orderItem: any) => {
        // Check if the orderItem's category is "container"
        if (orderItem.item.category === "container") {
          // Add the quantity to the totalQuantity
          return (GalQty += orderItem.qty);
        }
      });
    });

    // Total Bottle computatiom
    filtered.forEach((order: any) => {
      // Iterate through each order in the "orders" array
      order.orders.forEach((orderItem: any) => {
        // Check if the orderItem's category is "container"
        if (orderItem.item.category === "bottle") {
          // Add the quantity to the totalQuantity
          return (BottleQty += orderItem.qty);
        }
      });
    });

    // Total Expenses
    const totalExpense = filteredExp.reduce(
      (acc: any, exp: any) => acc + exp.amount,
      0
    );

    const newData = {
      Date: udate,
      tProfit: totalAmount,
      tDiscount: totalDiscount,
      tBalance: totalBalance,
      tGallon: GalQty,
      tBottle: BottleQty,
      tExpense: totalExpense,
      sorted_data: filtered,
    };

    return newData;
  });

  return salesData;
};

export default function ReportPage() {
  const results = useQueries([
    {
      queryKey: ["transactions"],
      queryFn: getTransactions,
      staleTime: 1000,
    },
    {
      queryKey: ["expenses"],
      queryFn: getAllExpenses,
      staleTime: 1000,
    },
  ]);
  const [saleData, setSaleData] = useState<any>([]);

  const histoyData = results[0]?.data;
  const expensesData = results[1].data;

  const historyIsLoading = results[0].isSuccess;
  const expensesIsLoading = results[1].isSuccess;

  useEffect(() => {
    if (historyIsLoading && expensesIsLoading) {
      salesReport(histoyData, expensesData)
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
