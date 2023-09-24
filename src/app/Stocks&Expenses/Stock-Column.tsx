"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { StockDataTableRowActions } from "./data-stock-row-action";

export const StockColumns: ColumnDef<any>[] = [
  {
    header: "Item",
    accessorKey: "fullname",
  },
  {
    header: "Type",
    accessorKey: "Alias",
  },
  {
    header: "Stock",
    accessorKey: "Alias",
  },
  {
    id: "action",
    cell: ({ row }) => <StockDataTableRowActions row={row} />,
  },
];
