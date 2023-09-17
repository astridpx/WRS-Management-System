"use client";

import { use, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { DataTableFilterDate } from "@/components/react-table/Main-Table-Date-Filter";
import { LastGallonReturnColumns } from "../Monitoring/Last-Gallon-Return-Column";
import { StockColumns } from "./Stock-Column";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StocksModalAddExpenses } from "./_components/Stocks-Modal-Add-Expenses";
import { ExpensesModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Expenses-Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const StockAndExpensesPage = () => {
  const monitoringData = use(DataGet);
  const { addExpensesModal, toggleAddExpensesModal } = ExpensesModalStore();
  const [tabs, setTabs] = useState<string>("daily");

  return (
    <>
      <StocksModalAddExpenses />

      <PageWrapper>
        <div className="relative ">
          <Tabs defaultValue="stock" className="">
            <div className="w-full h-max bg-slate-100 dark:bg-inherit">
              <TabsList className="grid  grid-cols-3 w-[30rem] m-0">
                <TabsTrigger value="stock">Stock</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="stock">
              <DataTable columns={StockColumns} data={monitoringData} />
            </TabsContent>

            <TabsContent value="expenses">
              <div className="w-full py-4 mb-2 grid grid-cols-3 items-center">
                <div className="col-span-2 font-semibold px-2  flex items-center gap-x-12">
                  <div className="flex items-center gap-x-2 bg-emerald-100 text-[#15bd50] px-2 py-1 rounded-3xl">
                    <h1>Today&apos;s Expenses:</h1>
                    <h1>P 29,000</h1>
                  </div>
                  <div className="flex items-center gap-x-2 px-2 py-1 bg-sky-100 text-[#21ACEB] rounded-3xl">
                    <h1>Monthly Expenses:</h1>
                    <h1>P 29,000</h1>
                  </div>
                </div>

                <div className="flex place-content-end gap-x-8 w-full">
                  <Select
                    defaultValue="daily"
                    onValueChange={(e) => setTabs(e)}
                  >
                    <SelectTrigger className="text-center bg-white w-[9rem] rounded-lg">
                      <SelectValue placeholder="Choose View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    className="dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400"
                    onClick={() => toggleAddExpensesModal(true)}
                  >
                    Add Expenses
                  </Button>
                </div>
              </div>
              {/* Table On Expenses tab */}

              <Tabs defaultValue="daily" value={tabs}>
                <TabsContent value="daily">
                  <DataTable columns={StockColumns} data={monitoringData} />
                </TabsContent>
                <TabsContent value="monthly">
                  <DataTable columns={StockColumns} data={monitoringData} />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default StockAndExpensesPage;
