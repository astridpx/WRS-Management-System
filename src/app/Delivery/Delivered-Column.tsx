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
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Customer",
    accessorKey: "customers",
    cell: ({ row }) => (
      <DataTableNameColumn
        name={row?.original?.fullname ? row?.original?.fullname : ""}
        isVillage={row?.original?.customer?.isVillage}
        phase={row?.original?.customer?.phase}
        blk={row?.original?.customer?.blk}
        lot={row?.original?.customer?.lot}
        addr={row?.original?.customer?.address}
        comment={row?.original?.customer?.comment}
      />
    ),
  },
  {
    header: "Order",
    accessorKey: "Alias",
    cell: ({ row }) => (
      <DataTableGallonColumn borrowed_gal={row.original.new_order} />
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
