"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableRowProps } from "../../../typings";
import { useState } from "react";
import { ItemsPageModalStore } from "@/lib/zustand/ItemsPage-store/Modals";
import { StocksModalStore } from "@/lib/zustand/Stocks-Expense-Page-store/Stocks-Modal";

export function StockDataTableRowActions<TData>({
  row,
}: DataTableRowProps<TData>) {
  const { toggleEditItemModal } = ItemsPageModalStore();
  const { setModalType, setItemId, toggleStocksModal, toggleHistoryModal } =
    StocksModalStore();

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
            }}
          >
            Stock In
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleStocksModal(true);
              setModalType("out");
              setItemId(row?.original?._id);
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
