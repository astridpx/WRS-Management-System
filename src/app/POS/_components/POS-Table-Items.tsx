"use client";

import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

interface PosItemProps {
  id?: string;
  type: string;
  price: number;
  img: StaticImageData;
}

export default function POSItems({ id, type, price, img }: PosItemProps) {
  const [total, setTotal] = useState<number>(0);
  const [clientGal, setClientGal] = useState<number>(0);
  const [WRSGal, setWRSGal] = useState<number>(0);

  useEffect(() => {
    const qty = clientGal + WRSGal;
    setTotal(price * qty);
  }, [clientGal, WRSGal, price]);

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
          onChange={(e) => setClientGal(parseFloat(e.target.value))}
          className="outline-none text-sm text-center"
        />
        <input
          type="number"
          min={0}
          value={WRSGal}
          onChange={(e) => setWRSGal(parseFloat(e.target.value))}
          className="outline-none text-sm text-center"
        />
        {/* <input
          type="number"
          min={0}
          className="outline-none text-sm text-center"
        /> */}
        <h5 className="text-sm">{total.toFixed(2)}</h5>

        <Checkbox className="mx-auto " />
      </div>
    </>
  );
}
