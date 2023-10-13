"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IItems } from "../../../typings";
import ModalBtnIcon from "./_components/Modal-Btn-Icon";

export const ReportColumns: ColumnDef<any>[] = [
  {
    id: "view",
    header: "View",
    cell: ({ row }) => <ModalBtnIcon row={row} />,
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
    accessorKey: "prod_name",
  },
  {
    header: "Total Bottle",
    accessorKey: "prod_import",
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
    accessorKey: "prod_import",
  },
];
