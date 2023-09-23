"use client";

import React from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { CardsData } from "@/utils/Dashboard/DashboardCards-data";
import { DashBoardCard } from "@/components/DashBoard/DashBoard-Card";
import BarChart from "@/components/DashBoard/Bar-Chart";
import DoughNutChart from "@/components/DashBoard/Doughnut-Chart";
import ReLineChart from "@/components/DashBoard/Line-Chart";

export default function Home() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <PageWrapper>
        <section className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {CardsData.map((data) => {
              return (
                <>
                  <DashBoardCard
                    icon={data.icon}
                    iconBg={data.iconBg}
                    iconColor={data.iconColor}
                    amount={data.amount}
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
                <BarChart />
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
