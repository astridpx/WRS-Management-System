"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableAddressColumn } from "../../components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "../../components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";

export const userColumns: ColumnDef<IUser>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Fullname",
    accessorKey: "fullname",
  },
  {
    header: "Address",
    accessorKey: "new_address",
    cell: ({ row }) => <DataTableAddressColumn row={row} />,
  },
  {
    header: "Gallon",
    accessorKey: "Alias",
    cell: ({ row }) => (
      <DataTableGallonColumn borrowed_gal={row.original?.borrowed_gal} />
    ),
  },
];
