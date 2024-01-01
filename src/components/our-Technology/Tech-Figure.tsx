import React from "react";
import Image from "next/image";

export default function TechFigure({ dosis, img, label }: any) {
  return (
    <div className="text-center space-y-6  flex justify-center flex-col items-center ">
      <figure className="h-max w-max p-12 rounded-full tech-shadow flex justify-center items-center ">
        <Image
          src={img}
          alt="Tech Image"
          height={78}
          width={78}
          unoptimized
          className=""
        />
      </figure>
      <h1 style={dosis.style} className="font-medium">
        {label}
      </h1>
    </div>
  );
}
