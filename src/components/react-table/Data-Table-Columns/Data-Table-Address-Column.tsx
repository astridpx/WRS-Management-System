import React from "react";
import { Row } from "@tanstack/react-table";

import { MdLocationPin, MdContactEmergency } from "react-icons/md";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & any>;
}

export function DataTableAddressColumn<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <>
      <div className=" w-max">
        <div className="flex gap-x-2 gap-y-2  pr-2 truncate max-w-sm">
          <MdLocationPin size={18} className="text-gray-600 " />
          {row?.original?.isVillage ? (
            <p className="flex gap-x-1 text-sm items-center">
              <span>P-{row?.original?.phase}</span>
              <span>BLK-{row?.original?.blk}</span>
              <span>L-{row?.original?.lot}</span>
            </p>
          ) : (
            <p className=" text-sm items-center">{row?.original?.address}</p>
          )}
        </div>

        <p className="flex gap-x-2 text-sm items-center pr-2   ">
          <MdContactEmergency size={18} className="text-gray-600" />
          <span className="max-w-sm inline-block truncate text-ellipsis">
            {row?.original?.comment ? row?.original?.comment : "No comment"}
          </span>
        </p>
      </div>
    </>
  );
}
