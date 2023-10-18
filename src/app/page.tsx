"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { CardsData } from "@/utils/Dashboard/DashboardCards-data";
import { DashBoardCard } from "@/components/DashBoard/DashBoard-Card";
import BarChart from "@/components/DashBoard/Bar-Chart";
import DoughNutChart from "@/components/DashBoard/Doughnut-Chart";
import ReLineChart from "@/components/DashBoard/Line-Chart";
import { useQueries } from "react-query";
import Loader from "@/components/loader/Spinner";
import {
  getAllHistory,
  getAllExpenses,
} from "@/components/DashBoard/services/api";
import { DashboardCardsData } from "@/components/DashBoard/helpers/Cards-data";
import { MonthlyBarChartProfit } from "@/components/DashBoard/helpers/Bar-Chart-Profit-Monthly";
import { DailyBarChartProfit } from "@/components/DashBoard/helpers/Bar-Chart-Profit-Daily";
import { YearlyBarChartProfit } from "@/components/DashBoard/helpers/Bar-Chart-Profit-Yearly";
import { GetAllYears } from "@/components/DashBoard/helpers/GetAllYears";
import { format } from "date-fns";

export default function Home() {
  const results = useQueries([
    {
      queryKey: ["transactions"],
      queryFn: getAllHistory,
      staleTime: 1000,
    },
    {
      queryKey: ["expenses"],
      queryFn: getAllExpenses,
      staleTime: 1000,
    },
  ]);
  const [cards, setCards] = useState<any>([]);
  const [daily, setDaily] = useState<any>([]);
  const [monthly, setMonthly] = useState<any>([]);
  const [yearly, setYearly] = useState<any>([]);
  const [day, setDay] = useState(30);
  const [month, setMonth] = useState<any>(format(new Date(), "MMM"));
  const [year, setYear] = useState<any>(format(new Date(), "yyyy"));
  const [allYears, setAllYears] = useState<any>([]);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const historyData = results[0]?.data;
  const historyIsSuccess = results[0].isSuccess;

  const expenseData = results[1]?.data;
  const expenseIsSuccess = results[1].isSuccess;

  useEffect(() => {
    async function fetchData() {
      try {
        if (historyIsSuccess && expenseIsSuccess) {
          const allYearsData = await GetAllYears(historyData);
          setAllYears(allYearsData);

          const cardsData = await DashboardCardsData(historyData, expenseData);
          setCards(cardsData);

          const dailyData = await DailyBarChartProfit(
            historyData,
            expenseData,
            day,
            year,
            month
          );
          setDaily(dailyData);

          const monthlyData = await MonthlyBarChartProfit(
            historyData,
            expenseData,
            year
          );
          setMonthly(monthlyData);

          const yearlyData = await YearlyBarChartProfit(
            historyData,
            expenseData,
            allYearsData
          );
          setYearly(yearlyData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [
    day,
    expenseData,
    expenseIsSuccess,
    historyData,
    historyIsSuccess,
    month,
    year,
  ]);

  return (
    <>
      <PageWrapper>
        <section className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {CardsData.map((data, index) => {
              return (
                <>
                  <DashBoardCard
                    icon={data.icon}
                    iconBg={data.iconBg}
                    iconColor={data.iconColor}
                    amount={cards.length === 0 ? 0 : cards[index]}
                    title={data.title}
                  />
                </>
              );
            })}
          </div>

          {/* CHARTS */}
          <div className="flex w-full gap-x-4 h-max ">
            <section className="w-[69%] relative space-y-2">
              <div className="h-[25rem]  w-full ">
                <BarChart
                  allYears={allYears}
                  daily={daily}
                  monthly={monthly}
                  yearly={yearly}
                  setDay={setDay}
                  setYear={setYear}
                  setMonth={setMonth}
                />
              </div>
              <div className="relative w-full h-[25rem]  ">
                <ReLineChart />
              </div>
            </section>

            <section className="h-[27.5rem] w-[29%]  relative space-y-2">
              <div className=" p-2 pb-4  bg-white space-y-2 rounded-lg">
                <DoughNutChart />
              </div>

              {/* TOP Customer */}
              <div className="h-full w-full p-4  bg-white space-y-2 rounded-lg">
                <h1 className="font-semibold text-lg text-gray-600">
                  Your Top 8 Customer
                </h1>
                <p className="text-sm text-slate-500  ">
                  Sales performance based by order
                </p>
                <div className=" pt-2">
                  {numbers.map((number) => {
                    return (
                      <>
                        <div
                          key={number}
                          className="flex justify-between text-sm p-2 border "
                        >
                          <h1 className="text-sm">Tandie O Canavan</h1>
                          <p className="font-medium text-gray-900">₱ 10,000</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
