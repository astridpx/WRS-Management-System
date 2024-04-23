"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { getTransactions, setToShip, setCancel } from "../services/api";
import OrderDeliveryStore from "@/lib/zustand/DeliveryPage-store/Orders-store";

// remove duplicates in zustand store array
function removeDuplicates(arr: any) {
  return arr.filter((item: { id: any }, index: any, self: any[]) => {
    return index === self.findIndex((i) => i.id === item.id);
  });
}

export default function CancelBTN({
  status,
  id,
}: {
  status: string;
  id: string;
}) {
  const queryClient = useQueryClient();
  const { ship, transit, clearOrder } = OrderDeliveryStore();

  const { mutateAsync } = useMutation({
    mutationFn: setCancel,
    onMutate: () => {
      LoadingToast("Processing order...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["transactions, delivery"],
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // THIS FILL MARK THE ORDER AS To Ship
  const setCancelOrder = async () => {
    const order = await removeDuplicates(ship);
    const newOrder = {
      //   orderId: order,
      orderId: [
        {
          id: id,
        },
      ],
    };

    await mutateAsync({ ...newOrder });
  };

  return (
    <Button
      type="button"
      disabled={status !== "Pending"}
      className="bg-red-200 text-red-500 hover:bg-red-500 hover:text-slate-50"
      onClick={() => setCancelOrder()}
    >
      Cancel
    </Button>
  );
}
