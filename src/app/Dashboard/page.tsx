"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { CardsData } from "@/utils/Dashboard/DashboardCards-data";
import { DashBoardCard } from "./_component/DashBoard-Card";
import BarChart from "./_component/Bar-Chart";
import DoughNutChart from "./_component/Doughnut-Chart";
import ReLineChart from "./_component/Line-Chart";
import { useQueries } from "react-query";
import Loader from "@/components/loader/Spinner";
import { getAllHistory, getAllExpenses } from "@/app/Dashboard/services/api";
import { DashboardCardsData } from "@/app/Dashboard/helpers/Cards-data";
import { MonthlyChartProfit } from "@/app/Dashboard/helpers/Chart-Profit-Monthly";
import { DailyChartProfit } from "@/app/Dashboard/helpers/Chart-Profit-Daily";
import { YearlyChartProfit } from "@/app/Dashboard/helpers/Chart-Profit-Yearly";
import { GetAllYears } from "@/app/Dashboard/helpers/GetAllYears";
import { TopCustomer } from "@/app/Dashboard/helpers/Top-Customer";
import { MonthlyDoughNutChart } from "@/app/Dashboard/helpers/Doughnut-Chart-Monthly";
import { format } from "date-fns";

export default function DashboardPage() {
  const results = useQueries([
    {
      queryKey: ["transactions"],
      queryFn: getAllHistory,
      staleTime: 10,
    },
    {
      queryKey: ["expenses"],
      queryFn: getAllExpenses,
      staleTime: 10,
    },
  ]);
  const [cards, setCards] = useState<any>([]);
  const [daily, setDaily] = useState<any>([]);
  const [monthly, setMonthly] = useState<any>([]);
  const [yearly, setYearly] = useState<any>([]);
  const [day, setDay] = useState(30);
  const [month, setMonth] = useState<any>(format(new Date(), "MMM"));
  const [year, setYear] = useState<any>(format(new Date(), "yyyy"));
  // LINE CHART
  const [dailyLine, setDailyLine] = useState<any>([]);
  const [monthlyLine, setMonthlyLine] = useState<any>([]);
  const [yearlyLine, setYearlyLine] = useState<any>([]);
  const [dayLine, setDayLine] = useState(30);
  const [monthLine, setMonthLine] = useState<any>(format(new Date(), "MMM"));
  const [yearLine, setYearLine] = useState<any>(format(new Date(), "yyyy"));
  const [allYears, setAllYears] = useState<any>([]);
  const [topCustomers, setTopCustomers] = useState<any>([]);
  // DOUGHNUTDoughNut
  const [monthlyDoughnut, setMonthlyDoughnut] = useState<any>([]);
  const [monthDoughNut, setMonthDoughNut] = useState<any>(
    format(new Date(), "MMM")
  );
  const [yearDoughNut, setYearDoughNut] = useState<any>(
    format(new Date(), "yyyy")
  );

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

          // BAR CHART DATA
          const dailyData = await DailyChartProfit(
            historyData,
            expenseData,
            day,
            year,
            month
          );
          setDaily(dailyData);

          const monthlyData = await MonthlyChartProfit(
            historyData,
            expenseData,
            year
          );
          setMonthly(monthlyData);

          const yearlyData = await YearlyChartProfit(
            historyData,
            expenseData,
            allYearsData
          );
          setYearly(yearlyData);

          // LINE CHART DATA
          const dailyDataLine = await DailyChartProfit(
            historyData,
            expenseData,
            dayLine,
            yearLine,
            monthLine
          );
          setDailyLine(dailyDataLine);

          const monthlyDataLine = await MonthlyChartProfit(
            historyData,
            expenseData,
            yearLine
          );
          setMonthlyLine(monthlyDataLine);

          const yearlyDataLine = await YearlyChartProfit(
            historyData,
            expenseData,
            allYearsData
          );
          setYearlyLine(yearlyDataLine);

          const top = await TopCustomer(historyData);
          setTopCustomers(top);

          const DoughnutData = await MonthlyDoughNutChart(
            historyData,
            yearDoughNut,
            monthDoughNut
          );
          setMonthlyDoughnut(DoughnutData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [
    day,
    dayLine,
    expenseData,
    expenseIsSuccess,
    historyData,
    historyIsSuccess,
    month,
    monthDoughNut,
    monthLine,
    year,
    yearDoughNut,
    yearLine,
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
                  daily={daily.map((d: any) => d.Bar)}
                  monthly={monthly.map((d: any) => d.Bar)}
                  yearly={yearly.map((d: any) => d.Bar)}
                  setDay={setDay}
                  setYear={setYear}
                  setMonth={setMonth}
                />
              </div>
              <div className="relative w-full h-[25rem]  ">
                <ReLineChart
                  allYears={allYears}
                  daily={dailyLine.map((d: any) => d.Line)}
                  monthly={monthlyLine.map((d: any) => d.Line)}
                  yearly={yearlyLine.map((d: any) => d.Line)}
                  setDay={setDayLine}
                  setYear={setYearLine}
                  setMonth={setMonthLine}
                />
              </div>
            </section>

            <section className="h-[27.5rem] w-[29%]  relative space-y-2">
              <div className=" p-2 pb-4  bg-white space-y-2 rounded-lg">
                <DoughNutChart
                  allYears={allYears}
                  setYear={setYearDoughNut}
                  setMonth={setMonthDoughNut}
                  monthlyDoughnut={monthlyDoughnut}
                />
              </div>

              {/* TOP Customer */}
              <div className="h-full w-full p-4  bg-white space-y-2 rounded-lg">
                <h1 className="font-semibold text-lg text-gray-600">
                  Your Top 9 Customer
                </h1>
                <p className="text-sm text-slate-500  ">
                  Sales performance based by order
                </p>
                <div className=" pt-2">
                  {topCustomers.map((person: any, index: any) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="flex justify-between text-sm p-2 border text-slate-500 "
                        >
                          <h1 className="text-sm ">
                            <span className="font-medium mr-2">
                              {index + 1}
                            </span>
                            {person.name}
                          </h1>
                          <p className="font-medium ">
                            ₱ {person.totalAmount?.toLocaleString()}
                          </p>
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
