"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";

export const LastGallonReturnColumns: ColumnDef<IUser>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "customer",
    cell: ({ row }) => <DataTableNameColumn row={row} />,
  },
  {
    header: "Gallom",
    cell: ({ row }) => <DataTableGallonColumn row={row} />,
  },

  {
    header: "Last Return",
    accessorKey: "customer",
    cell: ({ row }) => new Date().toDateString(),
  },
];
