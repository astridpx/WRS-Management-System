"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Name-Column";

export const CreditsColumns: ColumnDef<any>[] = [
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
    header: "QTY",
    accessorKey: "Alias",
  },
  {
    header: "Total",
    accessorKey: "Alias",
  },
  {
    header: "Unpaid",
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
