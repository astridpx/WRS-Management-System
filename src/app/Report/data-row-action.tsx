"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { deleteTransaction } from "./services/Api";

export function DataTableRowActions({ id }: any) {
  // const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteTransaction,
    onMutate: () => {
      LoadingToast("Deleting transaction...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["report, transactions, history"],
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleDelete = async () => {
    await mutateAsync(id);
  };

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
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
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
