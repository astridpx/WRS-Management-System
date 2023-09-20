"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { Undoaction } from "./Undo-action";

export const DeliveredColumns: ColumnDef<any>[] = [
  {
    id: "undo",
    cell: ({ row }) => <Undoaction row={row} />,
  },
  {
    header: "Customer",
    accessorKey: "address",
    cell: ({ row }) => <DataTableNameColumn row={row} />,
  },
  {
    header: "Gallon",
    accessorKey: "Alias",
    cell: ({ row }) => <DataTableGallonColumn row={row} />,
  },
  {
    header: "Status",
    accessorKey: "Alias",
  },
  {
    header: "Amount",
    accessorKey: "Alias",
  },
  {
    header: "Balance",
    accessorKey: "Alias",
  },
];
