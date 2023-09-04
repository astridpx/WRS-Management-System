"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
// import { DataTableRowActions } from "../Users/data-table-row-action";
import { DataTableAddressColumn } from "./Data-Table-Address-Column";
import { DataTableColumnHeader } from "./Data-Table-Column-Header";
import { Badge } from "@/components/ui/badge";

export const userColumns: ColumnDef<any>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Id" />
  //   ),
  //   cell: ({ row }) => {
  //     console.log(row);
  //     const label = row.find((label) => row.original.id--);

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("id")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Fullname",
    accessorKey: "fullname",
    cell: ({ row }) => `${row.original.first_name}  ${row.original.last_name}`,
  },
  {
    header: "Address",
    accessorKey: "address",
    cell: ({ row }) => <DataTableAddressColumn row={row} />,
  },
  {
    header: "Gallon",
    accessorKey: "Alias",
  },
  // {
  //   header: "Action",
  //   id: "action",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
