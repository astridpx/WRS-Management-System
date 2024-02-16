"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableAddressColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowCheckBox } from "./Data-Table-Row-CheckBox";
import { format } from "date-fns";

export const InTransitColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <DataTableRowCheckBox table={table} field={"transit"} />
    ),
    cell: ({ row }) => <DataTableRowCheckBox row={row} field={"transit"} />,
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "new_order",
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
    header: "Carrier",
    accessorKey: "deliverBy",
  },
  {
    header: "Time",
    accessorKey: "Alias",
  },
  {
    header: "Date",
    accessorKey: "Alias",
    cell: ({ row }) => (
      <p className="min-w-[6rem]">
        {format(new Date(row.original?.date), "LLL dd, y")}
      </p>
    ),
  },
];
