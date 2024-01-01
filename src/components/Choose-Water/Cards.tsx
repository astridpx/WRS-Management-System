import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Cards({
  dosis,
  img,
  name,
  orgPrice,
  disPrice,
  height,
  width,
}: any) {
  return (
    <>
      <div className="border bg-white p-4 tech-shadow rounded-xl">
        <figure className="h-[16rem] flex justify-center items-center">
          <Image
            src={img}
            alt="Round Gallon"
            height={height}
            width={width}
            unoptimized
            className=""
          />
        </figure>

        <article className="mt-4 text-center space-y-2">
          <h6
            style={dosis.style}
            className="text-dark_blue text-lg font-medium"
          >
            {name}
          </h6>
          <div className="flex justify-center">
            <FaStar size={16} className="text-light_blue" />
            <FaStar size={16} className="text-light_blue" />
            <FaStar size={16} className="text-light_blue" />
            <FaStar size={16} className="text-light_blue" />
            <FaStar size={16} className="text-light_blue" />
          </div>
          <div className="flex justify-center gap-x-2 font-bold">
            <h5 className="line-through text-slate-400">{orgPrice}</h5>
            <h5 className="text-dark_blue">{disPrice}</h5>
          </div>
        </article>
      </div>
    </>
  );
}
