"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryColumns } from "./Delivery-Column";
import { DeliveredColumns } from "./Delivered-Column";
import { InTransitColumns } from "./Intransit-Column";
import { getTransactions, setInTransit, setDelivered } from "./services/api";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// remove duplicates in zustand store array
function removeDuplicates(arr: any) {
  return arr.filter((item: { id: any }, index: any, self: any[]) => {
    return index === self.findIndex((i) => i.id === item.id);
  });
}

const Deliverypage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  const { ship, transit, clearOrder } = OrderDeliveryStore();
  const [isDelivered, setIsDelivered] = useState<boolean>(true);
  const [tab, setTab] = useState("toShip");
  const [carrier, setCarrier] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: isDelivered === true ? setDelivered : setInTransit,
    onMutate: () => {
      LoadingToast("Updating order status...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      clearOrder(isDelivered ? "transit" : "ship");
      setTab(isDelivered === true ? "delivered" : "inTransit");
      router.refresh();
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // FILTERING DATA
  const ToShip = data?.filter((item: any) => item.status === "To Ship");
  const InTransit = data?.filter((item: any) => item.status === "In Transit");
  const Delivered = data?.filter((item: any) => item.status === "Delivered");

  // THIS FILL MARK THE ORDER AS INTRANSIT
  const setOrderIntransit = async () => {
    const order = await removeDuplicates(ship);
    const newOrder = {
      orderId: order,
      carrier,
    };

    if (carrier.length === 0)
      return ErrorToast("Pls select a delivery person.");

    await mutateAsync({ ...newOrder });
  };

  // THIS WILL MARK THE ORDER AS DELIVERED
  const setOrderDelivered = async () => {
    const order = await removeDuplicates(transit);
    const newOrder = {
      orderId: order,
    };

    await mutateAsync({ ...newOrder });
  };

  return (
    <>
      <PageWrapper>
        <div className="relative bg-white ">
          <Tabs
            defaultValue="toShip"
            value={tab}
            onValueChange={(e) => setTab(e)}
          >
            <TabsList className="grid  grid-cols-3 w-[30rem]">
              <TabsTrigger value="toShip">To Ship</TabsTrigger>
              <TabsTrigger value="inTransit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            {/* Ready to deliver */}
            <TabsContent value="toShip" className="relative">
              <div className="flex  items-center w-maxs space-x-4 absolute right-4 top-3">
                <div className="w-fulls flex justify-center space-x-2  items-center">
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
                </div>

                <Button
                  onClick={() => {
                    setIsDelivered(false);
                    setOrderIntransit();
                  }}
                  className=" bg-white border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white duration-150 "
                >
                  Dispatch Order
                </Button>
              </div>

              {!isSuccess ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={DeliveryColumns} data={ToShip} />
              )}
            </TabsContent>

            {/* In Transit */}
            <TabsContent value="inTransit" className="relative">
              <Button
                onClick={() => {
                  setIsDelivered(true);
                  setOrderDelivered();
                }}
                className="absolute right-4 top-3 bg-white border border-green-400 text-green-400 hover:bg-green-400 hover:text-white duration-150 "
              >
                Delivered
              </Button>
              {!isSuccess ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={InTransitColumns} data={InTransit} />
              )}
            </TabsContent>

            {/* All delivered today */}
            <TabsContent value="delivered">
              {!isSuccess ? (
                <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                  <Loader />
                  <p className="text-gray-400 ">Loading...</p>
                </div>
              ) : (
                <DataTable columns={DeliveredColumns} data={Delivered} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default Deliverypage;
