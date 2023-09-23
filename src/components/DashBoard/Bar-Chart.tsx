import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    x: {
      beginAtZero: true,
      //   suggestedMin: 30,
      grid: {
        display: false, // Disable vertical grid lines for the x-axis / nakahiga
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
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        boxHeight: 8,
      },
    },
    title: {
      display: true,
      text: "Monthly Profit",
      font: {
        size: 19,
      },
    },
  },
};

const BarChart = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Profit",
        // data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 89, 90, 59],
        data: Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 10000) + 1500
        ),
        backgroundColor: "#05C3FB",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="p-1 rounded-lg w-full absolute z-10 flex justify-end items-center">
        <Select defaultValue="2020">
          <SelectTrigger className="min-w-[4rem] w-max h-max  text-sm">
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
      <Bar
        options={options}
        data={data}
        className="relative bg-white rounded-lg h-full w-full p-4"
      />
    </>
  );
};

export default BarChart;
