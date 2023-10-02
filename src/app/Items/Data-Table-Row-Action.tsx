"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableRowProps } from "../../../typings";

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
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { deleteItem } from "./services/Item-Api";

export function ProductDataTableRowActions<TData>({
  row,
}: DataTableRowProps<TData>) {
  const queryClient = useQueryClient();
  const [itemId, setItemId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toggleEditItemModal, setEditData } = ItemsPageModalStore();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => deleteItem(itemId),
    onMutate: () => {
      setIsOpen(false);
      LoadingToast("Removing item...");
    },
    onSuccess: async (data: any) => {
      DissmissToast();
      SuccessToast(data?.message);
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

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
              setEditData(row?.original);
              toggleEditItemModal(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <AlertDialogTrigger
            className="w-full"
            onClick={() => {
              setItemId(row?.original?._id);
              setIsOpen(true);
            }}
          >
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
