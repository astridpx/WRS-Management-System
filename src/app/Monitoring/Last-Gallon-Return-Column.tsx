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
    cell: ({ row }) => (
      <DataTableNameColumn
        name={row?.original?.fullname ? row?.original?.fullname : ""}
        isMain={row?.original?.isMain}
        street={row?.original?.street}
        brgy={row?.original?.brgy}
        city={row?.original?.city}
        addr={row?.original?.address}
        comment={row?.original?.comment}
      />
    ),
  },
  {
    header: "Gallom",
    cell: ({ row }) => (
      <DataTableGallonColumn borrowed_gal={row?.original?.borrowed_gal} />
    ),
  },

  {
    header: "Last Return",
    accessorKey: "sort_date",
    // cell: ({ row }) => new Date().toDateString(),
  },
];
