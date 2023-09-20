"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";

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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
