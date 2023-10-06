"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { StockDataTableRowActions } from "./data-stock-row-action";
import { DataTableItemName } from "@/components/react-table/Data-Table-Columns/Data-Table-Item-Name";

export const StockColumns: ColumnDef<any>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <DataTableItemName
        item={row?.original?.name}
        image={row?.original?.img}
      />
    ),
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
    header: "Stock",
    accessorKey: "stock",
  },
  {
    id: "action",
    cell: ({ row }) => <StockDataTableRowActions row={row} />,
  },
];
