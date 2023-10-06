import React from "react";
import { MdLocationPin, MdContactEmergency } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { Row } from "@tanstack/react-table";
import { DataTableRowProps } from "../../../../typings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DataTableNameColumn<TData>({ row }: DataTableRowProps<TData>) {
  return (
    <>
      <div className="w-max">
        <h1 className="flex gap-x-2 text-sm items-center pr-2   ">
          <BiSolidUser size={18} className="text-slate-500" />
          {row?.original?.fullname}
        </h1>
        <div className="flex gap-x-2 gap-y-2  pr-2 truncate max-w-sm">
          {row?.original?.isVillage ? (
            <>
              <MdLocationPin size={18} className="text-gray-600 " />
              <p className="flex gap-x-1 text-sm items-center">
                <span>P-{row?.original?.phase}</span>
                <span>BLK-{row?.original?.blk}</span>
                <span>L-{row?.original?.lot}</span>
              </p>
            </>
          ) : (
            // ADDRESS
            <TooltipProvider>
              <Tooltip>
                <TooltipContent>
                  <p> {row?.original?.address}</p>
                </TooltipContent>

                <MdLocationPin size={18} className="text-gray-600 " />
                <TooltipTrigger className="max-w-xs w-max h-max inline-block text-sm items-center">
                  <p>
                    <span className="truncate text-ellipsis block">
                      {row?.original?.address}
                    </span>
                  </p>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="flex gap-x-2 text-sm items-center pr-2   ">
          <MdContactEmergency size={18} className="text-slate-500" />
          <span className="max-w-sm inline-block truncate text-ellipsis">
            {row?.original?.comment}
          </span>
        </p>
      </div>
    </>
  );
}
