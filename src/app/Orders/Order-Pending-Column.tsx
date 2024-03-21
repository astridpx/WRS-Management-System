"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { DataTableRowActions } from "../Users/data-table-row-action";
import { DataTableAddressColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTablePendingRowCheckBox as DataTableRowCheckBox } from "./Data-Table-Row-Pending-Checkbox";
import { format } from "date-fns";

export const PendingOrderColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <DataTableRowCheckBox table={table} field={"ship"} />
    ),
    cell: ({ row }) => <DataTableRowCheckBox row={row} field={"ship"} />,
    enableSorting: false,
    enableHiding: false,
  },
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
    header: "Date",
    accessorKey: "Alias",
    cell: ({ row }) => (
      <p className="min-w-[6rem]">
        {format(new Date(row.original?.date), "LLL dd, y")}
      </p>
    ),
  },
];