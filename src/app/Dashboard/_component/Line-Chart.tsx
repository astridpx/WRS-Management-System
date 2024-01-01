import { useState, useEffect } from "react";
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

const viewOption = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function ReLineChart({
  monthly,
  daily,
  yearly,
  setDay,
  setYear,
  setMonth,
  allYears,
}: any) {
  const doc = new jsPDF(); //pdf print
  const [selected, setSelected] = useState("Monthly");
  const [MSelected, setMSelected] = useState(format(new Date(), "MMM"));
  const [YSelected, setYSelected] = useState<any>(format(new Date(), "y"));

  const monthNumber = parse(MSelected, "MMM", new Date());

  const day = getDaysInMonth(new Date(YSelected, monthNumber.getMonth()));

  const DaysOfMonth = Array.from({ length: day }, (_, index) => {
    return index + 1;
  });

  const data = {
    labels:
      selected === "Yearly"
        ? allYears
        : selected === "Daily"
        ? DaysOfMonth.map(String)
        : labels,
    datasets: [
      {
        label: "Sales",
        data:
          selected === "Monthly"
            ? monthly.map((d: any) => d.sales)
            : selected === "Daily"
            ? daily.map((d: any) => d.sales)
            : selected === "Yearly"
            ? yearly.map((d: any) => d.sales)
            : Array.from(
                {
                  length: 12,
                },
                () => Math.floor(Math.random() * 10000) + 1500
              ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
        pointRadius: 1,
      },

      {
        label: "Expenses",
        data:
          selected === "Monthly"
            ? monthly.map((d: any) => d.expenses)
            : selected === "Daily"
            ? daily.map((d: any) => d.expenses)
            : selected === "Yearly"
            ? yearly.map((d: any) => d.expenses)
            : Array.from(
                {
                  length: 12,
                },
                () => Math.floor(Math.random() * 10000) + 1500
              ),
        borderColor: "rgb(108,95,252)",
        backgroundColor: "rgba(108,95,252,0.5)",
        tension: 0.5,
        pointRadius: 1,
        fill: true,
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
        daily[index]?.sales,
        daily[index]?.expenses,
      ];
    });

    const MonthlyPrint = labels.map((d: any, index: string | number) => {
      return [
        `${d} ${YSelected}`,
        monthly[index]?.sales,
        monthly[index]?.expenses,
      ];
    });

    const YearlyPrint = allYears.map((d: any, index: string | number) => {
      return [d, yearly[index]?.sales, yearly[index]?.expenses];
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
    const title = `${selected} Sales & Expenses Report`;

    doc.setLineWidth(2);
    doc.text(title, 15, y);

    // GENERATE PDF
    await autoTable(doc, {
      head: [["Date", "Sales", "Expenses"]],
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

    await doc.save(`${filename}_Sales_Expenses_Report.pdf`);
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
                    onValueChange={(e) => setMSelected(e)}
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
                    onValueChange={(e) => setYSelected(e)}
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

        <Line
          options={options}
          data={data}
          className="relative bg-white rounded-lg h-full w-full p-4"
        />
      </div>
    </>
  );
}
