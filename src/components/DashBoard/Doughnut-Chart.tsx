import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/utils/Dashboard/Months-data";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    responsive: true,

    // legend: {
    //   position: "top" as const,
    //   labels: {
    //     usePointStyle: true,
    //     pointStyle: "circle",
    //     boxWidth: 8,
    //     boxHeight: 8,
    //     font: {
    //       size: 16,
    //     },
    //   },
    // },
    title: {
      display: true,
      text: "No. Of Customer in Month",
      font: {
        size: 16,
      },
    },
  },
};

export const data = {
  labels: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
  datasets: [
    {
      label: "count",
      // data: [12, 19, 8, 15],
      data: Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 10000) + 2000
      ),
      backgroundColor: ["Red", "Orange", "Yellow", "Blue"],
      borderWidth: 1,
    },
  ],
};

const DoughNutChart = () => {
  const current_month = new Date();
  const month = months[current_month.getMonth()];

  return (
    <>
      <div className=" w-full  flex justify-end items-center">
        <Select defaultValue={month}>
          <SelectTrigger className="min-w-[6rem] w-max h-max  text-sm">
            <SelectValue placeholder="year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {months.map((label) => {
                return (
                  <SelectItem key={label} value={label}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full justify-center">
        <Doughnut data={data} options={options} className="relative" />
      </div>
    </>
  );
};

export default DoughNutChart;
