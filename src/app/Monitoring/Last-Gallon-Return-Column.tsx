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
        isVillage={row?.original?.isVillage}
        phase={row?.original?.phase}
        blk={row?.original?.blk}
        lot={row?.original?.lot}
        addr={row?.original?.address}
        comment={row?.original?.comment}
      />
    ),
  },
  {
    header: "Gallom",
    cell: ({ row }) => (
      <DataTableGallonColumn
        slim={row?.original?.borrowed_gal?.slim?.borrowed}
        round={row?.original?.borrowed_gal?.round?.borrowed}
      />
    ),
  },

  {
    header: "Last Return",
    accessorKey: "sort_date",
    // cell: ({ row }) => new Date().toDateString(),
  },
];
