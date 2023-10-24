"use client";

import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

interface PosItemProps {
  id?: string;
  name: string;
  price: number;
  buy_price: number;
  img: string;
}

export default function POSItems({
  id,
  name,
  price,
  buy_price,
  img,
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

  return (
    <>
      <div className="grid grid-cols-8 gap-x-1 place-content-center text-center py-2 ">
        <h5 className="text-sm ">1</h5>
        <div className="text-sm col-span-2 flex items-center gap-x-2">
          <Image
            src={img}
            alt="Slim "
            height={30}
            width={30}
            unoptimized
            className="object-contain aspect-[4/3]"
          />
          <p>{name}</p>
        </div>
        {isBuy ? (
          <h5 className="text-sm">{buy_price.toFixed(2)}</h5>
        ) : (
          <h5 className="text-sm">{price.toFixed(2)}</h5>
        )}
        <input
          type="number"
          min={0}
          value={clientGal}
          defaultValue={0}
          disabled={isBuy}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (isNaN(newValue)) {
              setClientGal(0);
            } else {
              setClientGal(parseFloat(e.target.value));
            }
          }}
          className="outline-none text-sm text-center"
        />
        <input
          type="number"
          min={0}
          value={WRSGal}
          defaultValue={0}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (isNaN(newValue)) {
              setWRSGal(0);
            } else {
              setWRSGal(parseFloat(e.target.value));
            }
          }}
          className="outline-none text-sm text-center"
        />
        <h5 className="text-sm">{total.toFixed(2)}</h5>

        <Checkbox
          className="mx-auto"
          checked={isBuy}
          onCheckedChange={(e) => setIsBuy(e ? true : false)}
        />
      </div>
    </>
  );
}
