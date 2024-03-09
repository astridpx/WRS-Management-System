"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableAddressColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
// import { Undoaction } from "./Undo-action";

export const DeliveredColumns: ColumnDef<any>[] = [
  // {
  //   id: "undo",
  //   cell: ({ row }) => <Undoaction row={row} />,
  // },
  {
    header: "No",
    accessorKey: "_id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Customer",
    accessorKey: "customers",
    cell: ({ row }) => (
      <DataTableNameColumn
        name={row?.original?.fullname ? row?.original?.fullname : ""}
        isMain={row?.original?.customer?.isMain}
        street={row?.original?.customer?.street}
        brgy={row?.original?.customer?.brgy}
        city={row?.original?.customer?.city}
        addr={row?.original?.customer?.address}
        comment={row?.original?.customer?.comment}
      />
    ),
  },
  {
    header: "Order",
    accessorKey: "Alias",
    cell: ({ row }) => (
      <DataTableGallonColumn
        trn={row?.original._id}
        borrowed_gal={row.original.new_order}
      />
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Balance",
    accessorKey: "balance",
  },
  {
    header: "Time",
    accessorKey: "Alias",
  },
  {
    header: "Carrier",
    accessorKey: "deliverBy",
  },
];
