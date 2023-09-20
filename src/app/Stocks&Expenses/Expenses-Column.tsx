"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableItemName } from "@/components/react-table/Data-Table-Columns/Data-Table-Item-Name";
import Round from "@/assets/items_img/rounded_gallon.png";

export const ExpensesColumns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "fullname",
    cell: ({ row }) => (
      <DataTableItemName item={row?.original?.fullname} img={Round} />
    ),
  },
  {
    header: "Amount",
    accessorKey: "Alias",
  },
  {
    header: "Date",
    accessorKey: "Alias",
    cell: ({ row }) => "August 08 2023",
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
