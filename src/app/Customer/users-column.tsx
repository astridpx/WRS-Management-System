"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "./data-table-row-action";
import { DataTableAddressColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Address-Column";
import { DataTableGallonColumn } from "@/components/react-table/Data-Table-Columns/Data-Table-Gallon-Column";

// ? @what this where the table head define. This column will pass on DataTable component
// ? @desc This column define is a users colemn for user pages
// ? @desc The header name is will be the name that shows on the table
// ? @desc the accessorkey is the value that will display the assigned value must be match in the data that will display

export const userColumns: ColumnDef<IUser>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "fullname",
  },
  {
    header: "Address",
    accessorKey: "new_address",
    cell: ({ row }) => <DataTableAddressColumn row={row} />,
  },
  {
    header: "Gallon",
    cell: ({ row }) => (
      <DataTableGallonColumn
        // slim={row.original?.borrowed_gal?.slim?.borrowed}
        // round={row.original?.borrowed_gal?.round?.borrowed}
        borrowed_gal={row.original?.borrowed_gal}
      />
    ),
    // cell: ({ row }) => console.log(row.original) />
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
