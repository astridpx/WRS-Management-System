"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "./data-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";

export const monitoringHistoryColumns: ColumnDef<any>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "fullname",
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
    header: "Unpaid",
    accessorKey: "balance",
  },
  {
    header: "Time",
    accessorKey: "Alias",
  },
  {
    header: "Service",
    accessorKey: "service",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <p className="min-w-[5rem]">{row.original.status}</p>,
  },
  {
    header: "Date",
    accessorKey: "sort_date",
    cell: ({ row }) => <p className="min-w-[6rem]">{row.original.sort_date}</p>,
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions id={row.original._id} />,
  },
];
