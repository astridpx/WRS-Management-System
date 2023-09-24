"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "./data-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";

export const monitoringHistoryColumns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "fullname",
    cell: ({ row }) => <DataTableNameColumn row={row} />,
  },

  {
    header: "Service",
    accessorKey: "Alias",
  },
  {
    header: "Gallon",
    accessorKey: "phase",
  },
  {
    header: "Bottle",
    accessorKey: "phase",
  },
  {
    header: "Total",
    accessorKey: "blk",
  },
  {
    header: "Unpaid",
    accessorKey: "blk",
  },
  {
    header: "Date",
    cell: ({ row }) => new Date().toDateString(),
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
