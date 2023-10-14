"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IItems } from "../../../typings";
import ModalBtnIcon from "./_components/Modal-Btn-Icon";

export const ReportColumns: ColumnDef<any>[] = [
  {
    id: "view",
    header: "View",
    cell: ({ row }) => <ModalBtnIcon data={row.original?.sorted_data} />,
    // cell: ({ row }) => console.log(row),
  },
  {
    header: "Date",
    accessorKey: "Date",
  },
  {
    header: "Profit",
    accessorKey: "tProfit",
  },
  {
    header: "Total Gallon",
    accessorKey: "tGallon",
  },
  {
    header: "Total Bottle",
    accessorKey: "tBottle",
  },
  {
    header: "Discount",
    accessorKey: "tDiscount",
  },
  {
    header: "Unpaid",
    accessorKey: "tBalance",
  },
  {
    header: "Expenses",
    accessorKey: "tExpense",
  },
];
