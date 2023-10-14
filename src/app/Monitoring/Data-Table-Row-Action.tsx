"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitoringPageModalStore } from "@/lib/zustand/MonitoringPage-store/Modal-credit";

export function MonitoringDataTableRowActions({ balance, id }: any) {
  const { toggleCreditModal, setBalance, setTransId } =
    MonitoringPageModalStore();

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
        <DropdownMenuContent align="end" className="">
          <DropdownMenuItem
            onClick={async () => {
              setBalance(balance);
              setTransId(id);
              toggleCreditModal(true);
            }}
          >
            Pay
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
