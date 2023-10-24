import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { CiFilter } from "react-icons/ci";
import { BsPrinter } from "react-icons/bs";
import { format } from "date-fns";
import { months as labels } from "@/utils/Dashboard/Months-data";

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
      text: "Monthly Sales From Customer",
      font: {
        size: 16,
      },
    },
  },
};

const viewOption = ["Monthly", "Yearly"];

const DoughNutChart = ({
  monthlyDoughnut,
  allYears,
  setYear,
  setMonth,
}: any) => {
  const [selected, setSelected] = useState("Monthly");
  const [MSelected, setMSelected] = useState(format(new Date(), "MMM"));
  const [YSelected, setYSelected] = useState(format(new Date(), "yyyy"));

  const data = {
    labels: monthlyDoughnut.map((d: any) => {
      const labels = d.label === "others" ? "others" : `p-${d.label}`;

      return labels;
    }),
    datasets: [
      {
        label: "sale",
        // data: [12, 19, 8, 15],
        data: monthlyDoughnut.map((d: any) => d.sale),
        backgroundColor: ["Red", "Orange", "Yellow", "Blue", "Gray", "Pink"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setMonth(MSelected);
    setYear(YSelected);
  }, [MSelected, YSelected, setMonth, setYear]);

  return (
    <>
      <div className="w-full flex gap-x-2 justify-end items-center ">
        {/* <CiFilter size={20} className="text-slate-500 cursor-pointer" /> */}
        <BsPrinter size={18} className="text-slate-400 cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <CiFilter size={20} className=" cursor-pointer text-slate-500" />
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
              <DropdownMenuSubTrigger>Months</DropdownMenuSubTrigger>
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
              <DropdownMenuSubTrigger>Year</DropdownMenuSubTrigger>
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
      <div className="flex w-full justify-center">
        <Doughnut data={data} options={options} className="relative" />
      </div>
    </>
  );
};

export default DoughNutChart;
