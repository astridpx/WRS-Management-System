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
    accessorKey: "worth",
  },
  {
    header: "QTY",
    accessorKey: "qty",
  },
  {
    header: "Reason",
    accessorKey: "transaction",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Date",
    accessorKey: "sort_date",
  },
  {
    id: "action",
    cell: ({ row }) => (
      <DataRowDeleteHistoryAction
        ID={row?.original?.ID}
        id={row?.original?._id}
      />
    ),
  },
];
