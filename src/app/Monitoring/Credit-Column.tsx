"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";

export const CreditsColumns: ColumnDef<any>[] = [
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
        isVillage={row?.original?.customer.isVillage}
        phase={row?.original?.customer.phase}
        blk={row?.original?.customer.blk}
        lot={row?.original?.customer.lot}
        addr={row?.original?.customer.address}
        comment={row?.original?.customer.comment}
      />
    ),
  },
  {
    header: "Orders",
    accessorKey: "customer",
    cell: ({ row }) => (
      <DataTableGallonColumn
        slim={row?.original?.orders[0]?.slim?.qty}
        round={row?.original?.orders[0]?.round?.qty}
      />
    ),
  },
  {
    header: "Service",
    accessorKey: "service",
  },
  {
    header: "Total",
    accessorKey: "amount",
  },
  {
    header: "Unpaid",
    accessorKey: "balance",
  },
  {
    header: "Date",
    accessorKey: "sort_date",
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
