import React from "react";
import { MdLocationPin, MdContactEmergency } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { Row } from "@tanstack/react-table";
import { DataTableRowProps } from "../../../typings";

export function DataTableNameColumn<TData>({ row }: DataTableRowProps<TData>) {
  return (
    <>
      <div className="w-max">
        <h1 className="flex gap-x-2 text-sm items-center pr-2   ">
          <BiSolidUser size={18} className="text-slate-500" />
          {row?.original?.fullname}
        </h1>
        <div className="flex gap-x-2 gap-y-2  pr-2 truncate max-w-sm">
          <MdLocationPin size={18} className="text-slate-500 " />
          <p className="flex gap-x-1 text-sm items-center">
            <span>P-1</span>
            <span>BLK-12</span>
            <span>L-8</span>
          </p>
        </div>
        <p className="flex gap-x-2 text-sm items-center pr-2   ">
          <MdContactEmergency size={18} className="text-slate-500" />
          <span className="max-w-sm inline-block truncate text-ellipsis">
            George Pilay Kapatid ni {row?.original?.Alias}
          </span>
        </p>
      </div>
    </>
  );
}
