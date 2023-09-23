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
      <Line
        options={options}
        data={data}
        className="relative bg-white rounded-lg h-full w-full p-4"
      />
    </>
  );
}
