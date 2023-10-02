"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IItems } from "../../../typings";
import { ProductDataTableRowActions } from "./Data-Table-Row-Action";

export const productColumns: ColumnDef<IItems>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Item",
    accessorKey: "name",
  },
  {
    header: "Type",
    accessorKey: "category",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => (row.original?.price ? row.original?.price : "n/a"),
  },
  {
    header: "Buy",
    accessorKey: "buy_price",
    cell: ({ row }) =>
      row.original?.buy_price ? row.original?.buy_price : "n/a",
  },
  {
    id: "action",
    cell: ({ row }) => <ProductDataTableRowActions row={row} />,
  },
];
