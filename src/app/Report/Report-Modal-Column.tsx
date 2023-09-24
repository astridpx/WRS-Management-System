"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IItems } from "../../../typings";
import ModalBtnIcon from "./_components/Modal-Btn-Icon";

export const ReportModalColumns: ColumnDef<any>[] = [
  {
    header: "Date",
    accessorKey: "Sep 09 2023",
  },
  {
    header: "Profit",
    accessorKey: "prod_code",
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
    accessorKey: "stock",
  },
  {
    header: "Unpaid",
    accessorKey: "prod_import",
  },
  {
    header: "Expenses",
    accessorKey: "prod_import",
  },
];
