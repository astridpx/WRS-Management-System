"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingOrderColumns } from "./Order-Pending-Column";
import { getTransactions, setToShip } from "./services/api";
import { useQuery } from "react-query";
import Loader from "@/components/loader/Spinner";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import OrderDeliveryStore from "@/lib/zustand/DeliveryPage-store/Orders-store";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// remove duplicates in zustand store array
function removeDuplicates(arr: any) {
  return arr.filter((item: { id: any }, index: any, self: any[]) => {
    return index === self.findIndex((i) => i.id === item.id);
  });
}

const OrdersPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["transactions, delivery"],
    queryFn: getTransactions,
  });
  const { ship, transit, clearOrder } = OrderDeliveryStore();

  const { mutateAsync } = useMutation({
    mutationFn: setToShip,
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

  // FILTERING DATA
  const Pending = data?.filter(
    (item: any) => item.service === "Deliver" && item.status === "Pending"
  );

  // THIS FILL MARK THE ORDER AS To Ship
  const setAcceptOrder = async () => {
    const order = await removeDuplicates(ship);
    const newOrder = {
      orderId: order,
    };

    await mutateAsync({ ...newOrder });
  };

  return (
    <>
      <PageWrapper>
        <div className="relative bg-white rounded ">
          <div className="flex  items-center w-maxs space-x-4 absolute right-4 top-3">
            {/* <div className="w-fulls flex justify-center space-x-2  items-center">
                <Label htmlFor="carrier">Deliver by :</Label>
                <Select value={carrier} onValueChange={(e) => setCarrier(e)}>
                  <SelectTrigger className="w-32 py-1" name="carrier">
                    <SelectValue placeholder="Select person carries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bob">Bob</SelectItem>
                    <SelectItem value="Randy">Randy</SelectItem>
                    <SelectItem value="Tristan">Tristan</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

            <Button
              onClick={() => {
                setAcceptOrder();
              }}
              className="shadow bg-white border border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-150 "
            >
              Accept Order
            </Button>
          </div>

          {!isSuccess ? (
            <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
              <Loader />
              <p className="text-gray-400 ">Loading...</p>
            </div>
          ) : (
            <DataTable columns={PendingOrderColumns} data={Pending} />
          )}
        </div>
      </PageWrapper>
    </>
  );
};

export default OrdersPage;
