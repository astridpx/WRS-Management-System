"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProducts } from "../../../typings";
import { ProductDataTableRowActions } from "./Data-Table-Row-Action";

export const productColumns: ColumnDef<IProducts>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Item",
    accessorKey: "prod_code",
  },
  {
    header: "Type",
    accessorKey: "prod_name",
  },
  {
    header: "Price",
    accessorKey: "stock",
  },
  {
    header: "Buy",
    accessorKey: "prod_import",
  },
  {
    id: "action",

    cell: ({ row }) => <ProductDataTableRowActions row={row} />,
  },
];
