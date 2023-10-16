"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataAccNameColumn } from "./Data-Acc-name-column";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AccountDataTableRowActions } from "./Acc-row-action";

export const AccountsColumns: ColumnDef<any>[] = [
  {
    header: "No",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "fullname",
    cell: ({ row }) => (
      <DataAccNameColumn name={row.original.fullname} img={row.original.img} />
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Status",
    accessorKey: "",
    cell: ({ row }) => (
      <GrStatusGoodSmall
        size={13}
        className={`${
          row.original.active ? "text-[#32BD00]" : "text-[#DC5954]"
        } rounded-full`}
      />
    ),
  },
  {
    header: "Last Active",
    accessorKey: "last_active",
    // cell: ({ row }) => <p className="min-w-[5rem]">{row.original.sort_date}</p>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <AccountDataTableRowActions
        id={row.original._id}
        role={row.original.role}
      />
    ),
  },
];
