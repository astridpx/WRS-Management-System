"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableRowProps } from "../../../typings";
import { StocksModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Stocks-Modal";

export function StockDataTableRowActions<TData>({
  row,
}: DataTableRowProps<TData>) {
  const {
    setModalType,
    setItemId,
    toggleStocksModal,
    toggleHistoryModal,
    setImg,
  } = StocksModalStore();

  return (
    <>
      {/* DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <HiOutlineDotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              toggleStocksModal(true);
              setModalType("in");
              setItemId(row?.original?._id);
              setImg(row?.original?.img);

            }}
          >
            Stock In
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleStocksModal(true);
              setModalType("out");
              setItemId(row?.original?._id);
              setImg(row?.original?.img);
            }}
          >
            Stock Out
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleHistoryModal(true);
            }}
          >
            History
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
