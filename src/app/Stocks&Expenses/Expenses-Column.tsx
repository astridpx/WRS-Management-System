"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IExpenseDate, IImages } from "../../../typings";
import { DataTableItemName } from "@/components/react-table/Data-Table-Columns/Data-Table-Item-Name";
import Round from "@/assets/items_img/rounded_gallon.png";
import { ExpensesDataTableRowActions } from "./data-expenses-row-action";

export const ExpensesColumns: ColumnDef<IExpenseDate>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <DataTableItemName
        item={row?.original?.name}
        img={row?.original?.category as keyof IImages}
      />
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Date",
    accessorKey: "sort_date",
  },
  {
    id: "action",
    cell: ({ row }) => <ExpensesDataTableRowActions row={row} />,
  },
];
