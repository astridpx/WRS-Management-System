"use client";

import React, { useEffect, useState } from "react";
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
import { months as labels } from "@/utils/Dashboard/Months-data";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { BsPrinter } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, getDaysInMonth, getWeeksInMonth, parse } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
      text: "Total Profit",
      font: {
        size: 19,
      },
    },
  },
};

// const years = ["2020", "2021", "2022", "2023"];
const viewOption = ["Daily", "Weekly", "Monthly", "Yearly"];

const BarChart = ({
  monthly,
  daily,
  yearly,
  setDay,
  setYear,
  setMonth,
  allYears,
  monthlySE,
  dailySE,
  yearlySE,
}: any) => {
  const doc = new jsPDF(); //pdf print
  const [selected, setSelected] = useState("Monthly");
  const [MSelected, setMSelected] = useState(format(new Date(), "MMM"));
  const [YSelected, setYSelected] = useState(format(new Date(), "yyyy"));

  const monthNumber = parse(MSelected, "MMM", new Date());

  const day = getDaysInMonth(
    new Date(parseInt(YSelected), monthNumber.getMonth())
  );

  const DaysOfMonth = Array.from({ length: day }, (_, index) => {
    return index + 1;
  });

  const data = {
    labels:
      selected === "Yearly"
        ? allYears
        : selected === "Daily"
        ? DaysOfMonth.map(String)
        : labels, // Ensure labels is an array of strings

    datasets: [
      {
        label: "Profit",
        data:
          selected === "Monthly"
            ? monthly
            : selected === "Daily"
            ? daily
            : selected === "Yearly"
            ? yearly
            : Array.from(
                {
                  length: 12,
                },
                () => Math.floor(Math.random() * 10000) + 1500
              ),
        backgroundColor: "#05C3FB",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setDay(day);
    setMonth(MSelected);
    setYear(YSelected);
  }, [MSelected, YSelected, day, setDay, setMonth, setYear]);

  const HandlePrint = async () => {
    const DailyPrint = DaysOfMonth.map((d: any, index: string | number) => {
      return [
        `${monthNumber.getMonth() + 1}-${d}-${YSelected}`,
        dailySE[index]?.sales,
        dailySE[index]?.expenses,
        daily[index],
      ];
    });

    const MonthlyPrint = labels.map((d: any, index: string | number) => {
      return [
        `${d} ${YSelected}`,
        monthlySE[index]?.sales,
        monthlySE[index]?.expenses,
        monthly[index],
      ];
    });

    const YearlyPrint = allYears.map((d: any, index: string | number) => {
      return [
        d,
        yearlySE[index]?.sales,
        yearlySE[index]?.expenses,
        yearly[index],
      ];
    });

    const Body =
      selected === "Monthly"
        ? MonthlyPrint
        : selected === "Daily"
        ? DailyPrint
        : selected === "Yearly"
        ? YearlyPrint
        : false;

    const y = 10;
    const title = `${selected} Profit Report`;

    doc.setLineWidth(2);
    doc.text(title, 15, y);

    // GENERATE PDF
    await autoTable(doc, {
      head: [["Date", "Sales", "Expenses", "Profit"]],
      body: Body,
      startY: y + 10,
      theme: "grid",
    });

    const filename =
      selected === "Monthly"
        ? `${selected}_${YSelected}`
        : selected === "Daily"
        ? `${selected}_${MSelected}_${YSelected}`
        : selected === "Yearly"
        ? `${selected}_${YSelected}`
        : false;

    await doc.save(`${filename}_Profit_Report.pdf`);
  };

  return (
    <>
      <div className="relative">
        <div className="p-2 rounded-lg w-full absolute z-[2] flex gap-x-2 justify-end items-center">
          {/* <CiFilter size={20} className="text-slate-500 cursor-pointer" /> */}
          <BsPrinter
            size={18}
            className="text-slate-400 cursor-pointer"
            onClick={HandlePrint}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <CiFilter
                  size={20}
                  className=" cursor-pointer text-slate-500"
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px]">
              {/* View options */}
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>View</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={selected}
                    onValueChange={(e) => setSelected(e)}
                  >
                    {viewOption.map((d) => {
                      return (
                        <>
                          <DropdownMenuRadioItem key={d} value={d}>
                            {d}
                          </DropdownMenuRadioItem>
                        </>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />

              {/* monthly option */}
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  disabled={selected === "Monthly" || selected === "Yearly"}
                  className={`${
                    selected === "Monthly" || selected === "Yearly"
                      ? "cursor-not-allowed"
                      : "cursor-auto"
                  }`}
                >
                  Months
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={MSelected}
                    onValueChange={(e) => {
                      setMSelected(e);
                      // setMonth(MSelected);
                    }}
                  >
                    {labels.map((d) => {
                      return (
                        <>
                          <DropdownMenuRadioItem key={d} value={d}>
                            {d}
                          </DropdownMenuRadioItem>
                        </>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />

              {/* yearly options */}
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  disabled={selected === "Yearly"}
                  className={`${
                    selected === "Yearly" ? "cursor-not-allowed" : "cursor-auto"
                  }`}
                >
                  Year
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={YSelected}
                    onValueChange={(e) => {
                      setYSelected(e);
                      // setYear(e);
                    }}
                  >
                    {allYears.map((d: any) => {
                      return (
                        <>
                          <DropdownMenuRadioItem key={d} value={d}>
                            {d}
                          </DropdownMenuRadioItem>
                        </>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Bar
          options={options}
          data={data}
          className="relative bg-white rounded-lg h-full w-full p-4 pt-6"
        />
      </div>
    </>
  );
};

export default BarChart;
