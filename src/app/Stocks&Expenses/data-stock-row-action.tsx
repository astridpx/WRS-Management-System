"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Row } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { DeleteUser } from "../Customer/APIs/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "../../../typings";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ItemsPageModalStore } from "@/lib/zustand/ItemsPage-store/Modals";
interface DataTableRowActionsProps<TData> {
  row: Row<TData & any>;
}

export function StockDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const notify = () => toast.loading("Loading...");
  const { toggleEditItemModal } = ItemsPageModalStore();

  const deleteUserMutation = useMutation({
    mutationFn: () => DeleteUser(userId),
    onMutate: () => {
      notify();
    },
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.dismiss();
      setIsOpen(false);
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: any) => {
    deleteUserMutation.mutate();
  };

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
              toggleEditItemModal(true);
            }}
          >
            Stock In
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleEditItemModal(true);
            }}
          >
            Stock Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
