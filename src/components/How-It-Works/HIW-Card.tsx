import React from "react";
import HIW from "@/assets/landingPage/how-it-works-1.png";
import DashLine from "@/assets/landingPage/dash-line.png";
import Image from "next/image";

export default function HIWCard({ dosis, id, title, title2, img }: any) {
  return (
    <>
      <div className="text-center space-y-8">
        <div className="relative  flex items-center justify-center">
          <figure className="relative z-10 h-max w-max bg-white p-8 border rounded-full tech-shadow">
            <Image
              src={img}
              alt="How it Works"
              unoptimized
              height={66}
              width={66}
            />
          </figure>
          <Image
            src={DashLine}
            alt="Dashline"
            unoptimized
            height={40}
            width={256}
            className={`${
              id >= 4 && "hidden"
            } absolute  scale-110 -right-[50%]`}
          />
        </div>

        <div
          style={dosis.style}
          className="text-center font-semibold text-dark_blue/80 text"
        >
          <h5 className="">{title}</h5>
          <h6>{title2}</h6>
        </div>
      </div>
    </>
  );
}
