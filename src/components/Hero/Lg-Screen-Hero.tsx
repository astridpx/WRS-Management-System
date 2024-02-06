// "use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlassWater from "@/assets/landingPage/Glass.png";
import Image from "next/image";

export default function LgScreenHero({ dosis }: any) {
  return (
    <>
      <div className="md:block hidden h-[90vh] container mx-auto relative">
        <div className="md:w-[80%]  mx-auto grid grid-cols-3 items-center ">
          <aside className="col-span-2 space-y-2">
            <h2
              style={dosis.style}
              className="text-6xl font-bold text-[#081F46]"
            >
              READY TO
            </h2>
            <h2
              style={dosis.style}
              className="text-6xl font-bold text-[#379EFF] "
            >
              GET HYDRATED?
            </h2>
            <p className="w-[30rem] py-2 ">
              <span className="text-light_blue font-[900] mr-3">
                <strong>|</strong>
              </span>
              Quench your thirst with a splash of purest delights of water at
              our station, where every drop is a refreshing adventure!.
            </p>

            <div className="flex items-center gap-x-8">
              {/* <Button
                type="button"
                onClick={() => alert("hello")}
                className="text-xl font-semibold rounded-full py-6 px-10 btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-shadow"
              >
                Order Now
              </Button> */}
              <Link
                href={"/Contact-Us"}
                className="text-xl font-semibold rounded-full py-3 px-8 text-white btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-shadow"
              >
                Order Now
              </Link>
              <Link
                href={"/"}
                className="text-xl font-semibold rounded-full py-3 px-8 bg-white shadow-lg shadow-blue-400 hover:text-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-all"
              >
                Read More
              </Link>
            </div>
          </aside>
          <aside className="">
            <Image
              src={GlassWater}
              alt="GlassWater"
              height={400}
              width={300}
              unoptimized
              className=""
            />
          </aside>
        </div>
      </div>
    </>
  );
}
