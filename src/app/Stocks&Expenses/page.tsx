"use client";

import { use, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { StockColumns } from "./Stock-Column";
import { ExpensesColumns } from "./Expenses-Column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExpensesModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Expenses-Modal";
import { StockHistoryModal } from "./_components/Stock-History-Modal";
import { ExpensesModalAdd } from "./_components/Expenses-Modal-Add";
import { ExpensesModalEdit } from "./_components/Expenses-Modal-Edit";
import { StockModal } from "./_components/Stock-In-Modal";
import { useQueries } from "react-query";
import { getAllExpenses } from "./services/Expenses-Api";
import Loader from "@/components/loader/Spinner";
import { getAllStocks } from "./services/Stock-Api";
import { IItems, IStocks } from "../../../typings";

const StockAndExpensesPage = () => {
  const results = useQueries([
    { queryKey: ["stocks, items"], queryFn: getAllStocks },
    { queryKey: ["expenses"], queryFn: getAllExpenses },
  ]);
  const { toggleAddExpensesModal } = ExpensesModalStore();

  const stocksData = results[0]?.data?.data;
  const expensesData = results[1].data;

  const stocksIsLoading = results[0].isLoading;
  const expensesIsLoading = results[1].isLoading;

  return (
    <>
      <ExpensesModalAdd />
      <ExpensesModalEdit />
      <StockModal />
      <StockHistoryModal />

      <PageWrapper>
        <div className="relative bg-white ">
          <Tabs defaultValue="stock" className="">
            <TabsList className="grid  grid-cols-2 w-[30rem] m-0">
              <TabsTrigger value="stock">Stock</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="stock">
              {stocksIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={StockColumns} data={stocksData} />
              )}
            </TabsContent>

            <TabsContent value="expenses" className="relative">
              <Button
                className="absolute right-4 top-3 dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400"
                onClick={() => toggleAddExpensesModal(true)}
              >
                Add Expenses
              </Button>

              {expensesIsLoading ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={ExpensesColumns} data={expensesData} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default StockAndExpensesPage;
