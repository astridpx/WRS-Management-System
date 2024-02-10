import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { months } from "@/utils/Dashboard/Months-data";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { RxMixerHorizontal } from "react-icons/rx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

ChartJS.register(ArcElement, Tooltip, Legend);

const viewOption = ["Monthly", "Yearly"];

const DoughNutChart = ({
  monthlyDoughnut,
  yearlyDoughnut,
  allYears,
  setYear,
  setMonth,
}: any) => {
  const doc = new jsPDF();
  const [selected, setSelected] = useState("Monthly");
  const [MSelected, setMSelected] = useState(format(new Date(), "MMM"));
  const [YSelected, setYSelected] = useState(format(new Date(), "yyyy"));

  const data = {
    labels: (selected === "Yearly" ? yearlyDoughnut : monthlyDoughnut).map(
      (d: any, index: number) => {
        const labels = `p-${index}`;

        return labels;
      }
    ),
    datasets: [
      {
        label: "sale",
        // data: [12, 19, 8, 15, 29, 12, 19, 8],
        data: (selected === "Yearly" ? yearlyDoughnut : monthlyDoughnut).map(
          (d: any) => d.sale
        ),
        backgroundColor: [
          "red",
          "orange",
          "#86A789",
          "yellow",
          "blue",
          "#7743DB",
          "gray",
          "green",
          "#FFEECC",
          "pink",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      responsive: true,

      legend: {
        // position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 12,
          },
        },
        //   onClick: (e: any, legendItem: any, legend: any) => {
        //     const index = legendItem.datasetIndex;
        //     const chart = e.chart;
        //     const meta = chart.getDatasetMeta(index);

        //     // Toggle the visibility of the clicked dataset
        //     meta.hidden =
        //       meta.hidden === null ? !chart.data.datasets[index].hidden : null;

        //     // Update the chart to reflect the changes
        //     chart.update();
        //   },
      },
      title: {
        display: true,
        text: "Sales From Customer",
        font: {
          size: 16,
        },
      },
    },
  };

  useEffect(() => {
    setMonth(MSelected);
    setYear(YSelected);
  }, [MSelected, YSelected, setMonth, setYear]);

  const HandlePrint = async () => {
    const MonthlyPrint = monthlyDoughnut.map((d: any) => {
      return [d.label, d.sale];
    });

    const YearlyPrint = yearlyDoughnut.map((d: any) => {
      return [d.label, d.sale];
    });

    const Body =
      selected === "Monthly"
        ? MonthlyPrint
        : selected === "Yearly"
        ? YearlyPrint
        : false;

    const y = 10;
    const title = `${
      selected === "Monthly" ? `${MSelected}, ${YSelected}` : YSelected
    }  ${selected} Profit Report`;

    doc.setLineWidth(2);
    doc.text(title, 15, y);

    // GENERATE PDF
    await autoTable(doc, {
      head: [["Date", "Sales"]],
      body: Body,
      startY: y + 10,
      theme: "grid",
    });

    const filename =
      selected === "Monthly"
        ? `${selected}_${MSelected}_${YSelected}`
        : selected === "Yearly"
        ? `${selected}_${YSelected}`
        : false;

    await doc.save(`${filename}_Profit_Report.pdf`);
  };

  return (
    <>
      <div className="w-full  flex gap-x-2 justify-between items-center ">
        {/* LABEL VIEW DETAILS */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex "
              >
                <RxMixerHorizontal className="mr-2 h-4 w-4 " />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(selected === "Yearly" ? yearlyDoughnut : monthlyDoughnut).map(
                (d: any, index: number) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={index}
                      // checked={true}
                      // onCheckedChange={() => console.log(ChartJS)}
                      className="capitalize flex gap-x-2 items-center"
                    >
                      <span
                        style={{
                          backgroundColor:
                            data.datasets[0].backgroundColor[index],
                        }}
                        className="h-2 w-2"
                      ></span>

                      {d.label === "others" ? "others" : d.label}
                    </DropdownMenuCheckboxItem>
                  );
                }
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-x-2  items-center">
          <BsPrinter
            size={18}
            onClick={HandlePrint}
            className="text-slate-400 cursor-pointer"
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
                  disabled={selected === "Yearly"}
                  className={`${
                    selected === "Yearly" ? "cursor-not-allowed" : "cursor-auto"
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
      </div>

      <div className="flex w-full justify-center">
        <Doughnut data={data} options={options} className="relative" />
      </div>
    </>
  );
};

export default DoughNutChart;
