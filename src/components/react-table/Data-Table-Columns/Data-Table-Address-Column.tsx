import React from "react";
import { Row } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MdLocationPin,
  MdContactEmergency,
  MdAddLocationAlt,
} from "react-icons/md";

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
          {row?.original?.isMain ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>
                    <p className="">
                      <span>{row?.original?.street}</span>
                      <span> {row?.original?.brgy}</span>
                      <span> {row?.original?.city}</span>
                    </p>
                  </TooltipContent>

                  {row?.original?.isMain === true ? (
                    <MdLocationPin size={18} className="text-gray-600 " />
                  ) : (
                    <MdAddLocationAlt size={18} className="text-yellow-500 " />
                  )}
                  <TooltipTrigger className="max-w-xs w-max h-max inline-block text-sm items-center">
                    <p className="">
                      <span>{row?.original?.street},</span>
                      <span> {row?.original?.brgy},</span>
                      <span> {row?.original?.city}</span>
                    </p>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            // ADDRESS
            <TooltipProvider>
              <Tooltip>
                <TooltipContent>
                  <p> {row?.original?.address}</p>
                </TooltipContent>

                {row?.original?.isMain === true ? (
                  <MdLocationPin size={18} className="text-gray-600 " />
                ) : (
                  <MdAddLocationAlt size={18} className="text-yellow-500 " />
                )}
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

        {/* COMMENTS */}
        <TooltipProvider>
          <Tooltip>
            <TooltipContent>
              <p>
                {row?.original?.comment ? row?.original?.comment : "No comment"}
              </p>
            </TooltipContent>

            <TooltipTrigger>
              <p className="flex gap-x-2 text-sm items-center pr-2   ">
                <MdContactEmergency size={18} className="text-gray-600" />
                <span className="max-w-xs inline-block truncate text-ellipsis">
                  {row?.original?.comment
                    ? row?.original?.comment
                    : "No comment"}
                </span>
              </p>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
