"use client";

import React from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { CardsData } from "@/utils/Dashboard/DashboardCards-data";
import { DashBoardCard } from "@/components/DashBoard/DashBoard-Card";
import BarChart from "@/components/DashBoard/Bar-Chart";
import DoughNutChart from "@/components/DashBoard/Doughnut-Chart";
import ReLineChart from "@/components/DashBoard/Line-Chart";

export default function Home() {
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

          <div className="flex w-full gap-x-4 h-[25rem] items-center">
            <div className="relative w-[69%] ">
              <BarChart />
            </div>
            <div className="h-max w-[29%] p-4  bg-white flex justify-center  rounded-lg">
              <DoughNutChart />
            </div>
          </div>
          {/* <div className="w-full flex  gap-x-4"> */}
          <div className="relative w-full h-[25rem]  ">
            <ReLineChart />
          </div>
          {/* </div> */}
        </section>
      </PageWrapper>
    </>
  );
}
