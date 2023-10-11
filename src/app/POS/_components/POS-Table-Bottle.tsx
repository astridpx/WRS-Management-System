"use client";

import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

interface PosItemProps {
  id?: string;
  name: string;
  price: number;
  img: StaticImageData;
}

export default function POSBottle({ id, name, price, img }: PosItemProps) {
  const { setOrder, order, setPayment, resetorder } = POSPaymentModal();
  const [total, setTotal] = useState<number>(0);
  const [bottle, setBottle] = useState<number>(0);

  useEffect(() => {
    setTotal(price * bottle);
    setOrder(id, { id, img, name, qty: bottle, price: total });
  }, [bottle, price, setOrder, id, img, total, name]);

  // SET TOTAL PAYMENT
  useEffect(() => {
    const amount = order.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder?.price;
    }, 0);

    setPayment(amount);
  }, [order, setPayment]);

  // reset input fields after submitting form
  useEffect(() => {
    setBottle(0);
  }, [resetorder]);

  return (
    <>
      <div className="grid grid-cols-6 gap-x-1 place-content-center text-center py-2 ">
        <h5 className="text-sm ">1</h5>
        <div className="text-sm col-span-2 flex items-center gap-x-2">
          <Image
            src={img}
            alt="Slim "
            height={30}
            width={30}
            className="object-contain aspect-[4/3]"
          />
          <p>{name}</p>
        </div>
        <h5 className="text-sm">{price.toFixed(2)}</h5>
        <input
          type="number"
          min={0}
          value={bottle}
          defaultValue={0}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (isNaN(newValue)) {
              setBottle(0);
            } else {
              setBottle(parseFloat(e.target.value));
            }
          }}
          className="outline-none text-sm text-center"
        />
        <h5 className="text-sm">{total.toFixed(2)}</h5>
      </div>
    </>
  );
}
