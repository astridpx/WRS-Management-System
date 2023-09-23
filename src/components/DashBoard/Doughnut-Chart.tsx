import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
      text: "No. Of Customer",
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
      data: [12, 19, 8, 15],
      backgroundColor: ["Red", "Orange", "Yellow", "Blue"],
      borderWidth: 1,
    },
  ],
};

const DoughNutChart = () => {
  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default DoughNutChart;
