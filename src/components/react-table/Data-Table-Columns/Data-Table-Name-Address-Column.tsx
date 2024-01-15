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

export interface ITNameAddress {
  name: string;
  isMain: Boolean;
  addr?: string;
  comment?: string;
  street?: string;
  brgy?: string;
  city?: string;
}

export function DataTableNameColumn<TData>({
  name,
  addr,
  comment,
  isMain,
  street,
  brgy,
  city,
}: ITNameAddress) {
  return (
    <>
      <div className="w-max">
        <h1 className="flex gap-x-2 text-sm items-center pr-2   ">
          <BiSolidUser size={18} className="text-slate-500" />
          {name}
        </h1>
        <div className="flex gap-x-2 gap-y-2  pr-2 truncate max-w-sm">
          {isMain ? (
            <>
              <MdLocationPin size={18} className="text-gray-600 " />
              <p className="flex gap-x-1 text-sm items-center">
                <span>{street},</span>
                <span>{brgy},</span>
                <span>{city},</span>
              </p>
            </>
          ) : (
            // ADDRESS
            <TooltipProvider>
              <Tooltip>
                <TooltipContent>
                  <p>{addr}</p>
                </TooltipContent>

                <MdLocationPin size={18} className="text-gray-600 " />
                <TooltipTrigger>
                  <p className=" w-max h-max text-sm items-center">
                    <span className="max-w-xs inline-block truncate text-ellipsis">
                      {addr}
                    </span>
                  </p>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="flex gap-x-2 text-sm items-center pr-2   ">
          <MdContactEmergency size={18} className="text-slate-500" />
          <span className="max-w-xs inline-block truncate text-ellipsis">
            {comment ? comment : "No comment"}
          </span>
        </p>
      </div>
    </>
  );
}
