import React, { useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
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
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { deleteStockHistory } from "./services/Stock-Api";

interface IDs {
  ID: string;
  id: string;
}

export function DataRowDeleteHistoryAction({ ID, id }: IDs) {
  const queryClient = useQueryClient();
  const [PID, setPID] = useState("");
  const [FID, setFID] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: () => deleteStockHistory(FID, PID),
    onMutate: () => {
      LoadingToast("Deleting history...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
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
    <>
      <AlertDialog>
        <AlertDialogTrigger
          onClick={() => {
            setPID(ID);
            setFID(id);
          }}
        >
          <RiDeleteBack2Line size={18} className="cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will be remove the history permanent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
