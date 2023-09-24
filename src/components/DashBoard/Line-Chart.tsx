import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { months as labels } from "@/utils/Dashboard/Months-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      beginAtZero: true,
      //   suggestedMin: 30,
      grid: {
        display: false, // Disable vertical grid lines for the x-axis
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      //   suggestedMin: 35,
      border: { display: false },
    },
  },

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sales & Expenses",
      font: {
        size: 19,
      },
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 10000) + 2000
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
      pointRadius: 1,
    },

    {
      label: "Expenses",
      data: Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 10000) + 2000
      ),
      borderColor: "rgb(108,95,252)",
      backgroundColor: "rgba(108,95,252,0.5)",
      tension: 0.5,
      pointRadius: 1,
      fill: true,
    },
  ],
};

export default function ReLineChart() {
  return (
    <>
      <div className="p-1 rounded-lg w-full absolute z-10 flex justify-end items-center">
        <Select defaultValue="2020">
          <SelectTrigger className="min-w-[6rem] w-max h-max  text-sm">
            <SelectValue placeholder="year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Line
        options={options}
        data={data}
        className="relative bg-white rounded-lg h-full w-full p-4"
      />
    </>
  );
}
