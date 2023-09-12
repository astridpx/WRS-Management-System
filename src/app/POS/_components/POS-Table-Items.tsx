"use client";

import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

interface PosItemProps {
  id?: string;
  type: string;
  price: number;
  img: StaticImageData;
}

export default function POSItems({ id, type, price, img }: PosItemProps) {
  const { setOrder, order, setPayment } = POSPaymentModal();
  const [total, setTotal] = useState<number>(0);
  const [clientGal, setClientGal] = useState<number>(0);
  const [WRSGal, setWRSGal] = useState<number>(0);

  useEffect(() => {
    const qty = clientGal + WRSGal;
    setTotal(price * qty);
    setOrder(id, { id, img, type, qty, price: total });
  }, [clientGal, WRSGal, price, setOrder, id, img, total, type]);

  useEffect(() => {
    const amount = order.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder?.price;
    }, 0);

    setPayment(amount);
  }, [order, setPayment]);

  return (
    <>
      <div className="grid grid-cols-8 gap-x-1 place-content-center text-center py-2 ">
        <h5 className="text-sm ">1</h5>
        <div className="text-sm col-span-2 flex items-center gap-x-2">
          <Image src={img} alt="Slim " height={25} className="" />
          <p>{type}</p>
        </div>
        <h5 className="text-sm">{price.toFixed(2)}</h5>
        <input
          type="number"
          min={0}
          value={clientGal}
          defaultValue={0}
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

        <Checkbox className="mx-auto " />
      </div>
    </>
  );
}
