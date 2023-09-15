"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Name-Column";

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
    header: "Qty",
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
    header: "Credit",
    accessorKey: "Alias",
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
