"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataRowDeleteHistoryAction } from "./data-stock-history-delete-action";

export const StockHistoryColumns: ColumnDef<any>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Price",
    accessorKey: "fullname",
  },
  {
    header: "QTY",
    accessorKey: "Alias",
  },
  {
    header: "Reason",
    accessorKey: "Alias",
  },
  {
    header: "Status",
    accessorKey: "Alias",
  },
  {
    header: "Date",
    accessorKey: "Alias",
  },
  {
    id: "action",
    cell: ({ row }) => <DataRowDeleteHistoryAction row={row} />,
  },
];
