"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { DataTableRowActions } from "../Users/data-table-row-action";
import { DataTableAddressColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Name-Address-Column";
import { Checkbox } from "@/components/ui/checkbox";

export const DeliveryColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    header: "Customer",
    accessorKey: "address",
    cell: ({ row }) => <DataTableNameColumn row={row} />,
  },
  {
    header: "Gallon",
    accessorKey: "Alias",
    cell: ({ row }) => <DataTableGallonColumn row={row} />,
  },
  {
    header: "Status",
    accessorKey: "Alias",
  },
  {
    header: "Amount",
    accessorKey: "Alias",
  },
  {
    header: "Balance",
    accessorKey: "Alias",
  },
  {
    header: "Time",
    accessorKey: "Alias",
  },
];
