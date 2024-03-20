"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import { HiMinus } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

interface PosItemProps {
  id?: string;
  name: string;
  price: number;
  buy_price: number;
  img: string;
  tab: boolean;
}

export default function Item_POS_Card({
  id,
  name,
  price,
  buy_price,
  img,
  tab,
}: PosItemProps) {
  const {
    setOrder,
    order,
    setPayment,
    resetorder,
    setIsBuy,
    isBuy,
    setIsBorrowed,
  } = POSPaymentModal();
  const [total, setTotal] = useState<number>(0);
  const [clientGal, setClientGal] = useState<number>(0);
  const [WRSGal, setWRSGal] = useState<number>(0);

  useEffect(() => {
    const qty = clientGal + WRSGal;
    const newTotal = isBuy ? buy_price * qty : price * qty;

    setTotal(newTotal);
    setOrder(id, { id, img, name, qty, price: total });

    if (WRSGal > 0) {
      setIsBorrowed(true);
    }
  }, [
    clientGal,
    WRSGal,
    price,
    setOrder,
    id,
    img,
    total,
    name,
    isBuy,
    buy_price,
    setIsBorrowed,
  ]);

  // reset input fields after submitting form
  useEffect(() => {
    setWRSGal(0);
    setClientGal(0);
  }, [resetorder]);

  // set total payment
  useEffect(() => {
    const amount = order.reduce((accumulator: any, currentOrder: any) => {
      return accumulator + currentOrder?.price;
    }, 0);

    setPayment(amount);
  }, [order, setPayment]);

  // HANDLE BUTTON CLICK
  const HandleClick = (arg: string, cli_gal: boolean) => {
    if (cli_gal) {
      if (arg === "add") setClientGal(clientGal + 1);
      else {
        if (clientGal <= 0) setClientGal(0);
        else setClientGal(clientGal - 1);
      }
    } else {
      if (arg === "add") setWRSGal(WRSGal + 1);
      else {
        if (WRSGal <= 0) setWRSGal(0);
        else setWRSGal(WRSGal - 1);
      }
    }
  };

  return (
    <div className=" grid grid-cols-6 gap-x-3 bg-white border rounded-sm shadow p-2">
      {/* <div className="col-span-2 grid place-content-center"> */}
      <figure className="h-max col-span-2 p-1 bg-slate-100 rounded-lg overflow-hidden">
        <Image
          src={img}
          alt="Item"
          height={500}
          width={200}
          unoptimized
          // onClick={() => alert(tab)}
          className="h-20 w-auto aspect-[4/3] object-contain"
        />
      </figure>
      {/* </div> */}

      <div
        className={`${
          !tab ? "justify-between" : ""
        }  col-span-4 flex flex-col space-y-2`}
      >
        <div className="flex justify-between">
          <h5 className="font-semibold ">{name}</h5>
          <span className="font-semibold text-sm text-blue-600">
            ₱ {isBuy ? buy_price.toFixed(2) : price.toFixed(2)}
          </span>
        </div>

        <div className={`${tab ? "grid" : "hidden"}  grid-cols-4 w-full`}>
          <Label htmlFor="buy">Buy :</Label>

          <Checkbox
            id="buy"
            checked={isBuy}
            onCheckedChange={(e) => setIsBuy(e ? true : false)}
          />
        </div>

        <div className="flex flex-col w-full space-y-2">
          <div className={`${tab ? "grid" : "hidden"}  grid-cols-4 w-full`}>
            <p className="text-xs font-semibold">OWN :</p>

            <Button
              variant="outline"
              className="h-6 w-full"
              onClick={() => HandleClick("minus", true)}
            >
              <span>
                <HiMinus />
              </span>
            </Button>
            <h6 className="text-center">
              {clientGal.toString().padStart(2, "0")}
            </h6>
            <Button
              variant="outline"
              className="h-6 w-full"
              onClick={() => HandleClick("add", true)}
            >
              <span>
                <IoIosAdd />
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-4 w-full ">
            <p className="text-xs font-semibold">WRS :</p>

            <Button
              variant="outline"
              className="h-6 w-full"
              onClick={() => HandleClick("minus", false)}
            >
              <span>
                <HiMinus />
              </span>
            </Button>
            <h6 className="text-center">
              {WRSGal.toString().padStart(2, "0")}
            </h6>
            <Button
              variant="outline"
              className="h-6 w-full"
              onClick={() => HandleClick("add", false)}
            >
              <span>
                <IoIosAdd />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
