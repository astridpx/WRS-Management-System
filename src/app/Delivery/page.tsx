"use client";

import { useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryColumns } from "./Delivery-Column";
import { DeliveredColumns } from "./Delivered-Column";
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

const Deliverypage = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  const [isDelivered, setIsDelivered] = useState<boolean>(false);

  const { mutateAsync } = useMutation({
    mutationFn: isDelivered ? setInTransit : setDelivered,
    onMutate: () => {
      LoadingToast("Updating order status...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
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

  const setOrderIntransit = async () => {
    SuccessToast("Order in Transit");
    // await mutateAsync({ ...Data });
  };

  const setOrderDelivered = async () => {
    SuccessToast("Order is delivered");

    // await mutateAsync({ ...Data });
  };

  return (
    <>
      <PageWrapper>
        <div className="relative bg-white ">
          <Tabs defaultValue="toShip" className="">
            <TabsList className="grid  grid-cols-3 w-[30rem]">
              <TabsTrigger value="toShip">To Ship</TabsTrigger>
              <TabsTrigger value="inTransit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            {/* Ready to deliver */}
            <TabsContent value="toShip" className="relative">
              <Button
                onClick={() => setOrderIntransit()}
                className="absolute right-4 top-3 bg-white border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white duration-150 "
              >
                Dispatch Order
              </Button>
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
                onClick={() => setOrderDelivered()}
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
                <DataTable columns={DeliveryColumns} data={InTransit} />
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
