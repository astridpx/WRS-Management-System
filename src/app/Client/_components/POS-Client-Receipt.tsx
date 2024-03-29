"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";
import { Orders } from "../../../../typings";
import { DatePicker } from "@/components/Date-Picker/Date-Picker";
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
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  InfoToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient } from "react-query";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { CreateNotif, createTransaction, stockOut } from "../services/api";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function POS_Client_Receipt() {
  const queryClient = useQueryClient();
  const [date, setDefDate] = useState<Date | undefined>(new Date());
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const { setCustomer, customer, setselectedCustomer } = POSBTNHeaderStore();
  const { user } = UserStore();

  const {
    paymentModal,
    togglePaymentModal,
    setIsBuy,
    setResetOrder,
    setService,
    resetorder,
    clearOrder,
    payment,
    order,
    service,
    // date,
    setDate: setterDate,
    time,
    isBuy,
    isBorrowed,
    setIsBorrowed,
  } = POSPaymentModal();

  //   useEffect(() => {
  //     setterDate(newDate ? newDate : new Date());
  //   }, [newDate, setterDate]);
  useEffect(() => {
    if (resetorder) {
      setDefDate(new Date());
      setNewDate(new Date());
      setterDate(new Date());
    }
  }, [resetorder, setterDate]);

  // CREATE NOTIFICATION MUTATION
  const NotifMutate = useMutation({
    mutationFn: async (notifData) => {
      CreateNotif({ data: notifData });
    },
    onMutate: () => {
      console.log("Checking notif...");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      InfoToast(data?.message);
    },
    onError: (error: any) => {
      ErrorToast(error?.response?.data?.message);
    },
  });

  const StockMutation = useMutation({
    mutationFn: async ({ data, itemId }: any) => {
      const response = await stockOut({ ...data }, itemId);
      return response;
    },
    onMutate: () => {
      console.log("Stock Out mutating...");
    },
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries();
      NotifMutate.mutateAsync(data?.notifData);
      queryClient.invalidateQueries({
        queryKey: ["stocks, items"],
      });
    },
    onError: (error: any) => {
      ErrorToast(error?.response?.data?.message);
    },
  });

  // CREATE TRANSACTION MUTATION
  const { mutateAsync } = useMutation({
    mutationFn: createTransaction,
    onMutate: () => {
      togglePaymentModal(false);
      LoadingToast("Creating new transaction...");
    },
    onSuccess: (data) => {
      DissmissToast();
      queryClient.invalidateQueries({
        queryKey: ["transactions, delivery, credits, last_return"],
      });
      SuccessToast(data?.message);

      setCustomer([]);
      setselectedCustomer(false);
      clearOrder();
      setResetOrder(!resetorder);
      // setIsBuy(false);
      setService("Deliver");
      setIsBorrowed(false);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async () => {
    const Orders = await order
      .filter((order) => order.qty > 0)
      .map((order) => ({ item: order.id, ...order }));

    const Data = {
      // customer: "65d3ef5b4582ea48a5e1594a",
      customer: user._id,
      service,
      date: newDate,
      time,
      status: "Pending",
      amount: payment,
      discount: 0,
      balance: payment,
      paid: false,
      isBuy,
      isBorrowed,
      orders: Orders,
    };
    if (!user._id) return ErrorToast("No session detected");
    if (Orders.length === 0) return ErrorToast("Pls Select a order");

    await mutateAsync({ ...Data });

    // CREATED A STOCK OUT DATA PAYLOAD
    await Orders.map(async (s: any) => {
      const stockOutData = {
        worth: s.price,
        qty: s.qty,
        transaction: "buy",
        date,
      };

      if (isBuy) {
        await StockMutation.mutateAsync({ data: stockOutData, itemId: s.id });
      }
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The item you ordered will be review
              by our admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit()}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        {/* <div className="h-[32rem] flex flex-col justify-between "> */}
        <div className="py-2">
          <div className="flex justify-between items-center px-2">
            <h4 className="font-semibold">Date</h4>
            {/* DATE PICKER */}
            <DatePicker
              calendar_width={"w-max"}
              variant={"ghost"}
              // setDate={(nDate) => {
              //   setDefDate(nDate);
              //   setNewDate(nDate);
              // }}

              date={date}
            />
          </div>
          <Separator />
          <h2 className="text-center my-2 text-gray-500">Order Summary</h2>
          <Separator />
          <div className="px-2 pb-4 min-h-[10rem]">
            <div className="grid grid-cols-3 py-2 font-semibold border-b">
              <h1>Item</h1>
              <h1 className="text-center">QTY</h1>
              <h1 className="text-end">Price</h1>
            </div>

            {order.map((orders: Orders) => {
              return (
                <>
                  <div key={orders.id} className="grid grid-cols-3 py-2 ">
                    <div className="text-sm flex items-center gap-x-2">
                      {orders.img && (
                        <Image
                          src={orders.img}
                          alt="Slim "
                          height={30}
                          width={30}
                          unoptimized
                          className="object-contain aspect-[4/3]"
                        />
                      )}
                      <p>{orders.name}</p>
                    </div>
                    <h2 className="text-center">{orders.qty}</h2>
                    <h2 className="text-end">{orders.price?.toFixed(2)}</h2>
                  </div>
                </>
              );
            })}
          </div>

          {/* bottom amount */}
          <Separator />
          <div className="grid grid-cols-3 p-2">
            <h1>Total</h1>
            <h1 className="text-center">
              {order.reduce((accumulator, currentOrder) => {
                return accumulator + currentOrder?.qty;
              }, 0)}
            </h1>
            <h1 className="text-end">{payment.toFixed(2)}</h1>
          </div>
        </div>

        {/* SUB TOTAL */}
        <footer className="">
          <div className="space-y-4 ">
            <Separator />
            <div className="flex justify-between px-2">
              <h1 className="font-semibold text-xl">SUB TOTAL</h1>
              <h1 className="text-xl">₱{payment.toFixed(2)}</h1>
            </div>
            <Separator />
            <div className="flex justify-center pb-4">
              <AlertDialogTrigger asChild>
                {/* <Button className="" onClick={() => togglePaymentModal(true)}> */}
                <Button className="">Confirm Payment</Button>
              </AlertDialogTrigger>
            </div>
          </div>
        </footer>
        {/* </div> */}
      </AlertDialog>
    </>
  );
}
