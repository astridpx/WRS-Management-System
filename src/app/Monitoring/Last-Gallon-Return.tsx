"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";

export const LastGallonReturnColumns: ColumnDef<any>[] = [
  // {
  //   header: "Id",
  //   accessorKey: "_id",
  //   {"id":20,"first_name":"Pearla","last_name":"Blizard","Alias":"Ynez","phase":2,"blk":33},
  // },
  {
    header: "Name",
    accessorKey: "fullname",
  },
  {
    header: "Gallom",
    accessorKey: "Alias",
  },

  {
    header: "Last Return",
    cell: ({ row }) => new Date().toDateString(),
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
