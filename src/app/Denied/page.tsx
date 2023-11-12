import React from "react";
import Image from "next/image";
import Link from "next/link";
import P403 from "@/assets/403.svg";

export default function DeniedPage() {
  return (
    <>
      <main className="h-screen w-full bg-white relative">
        <div className="flex justify-center items-end h-[25rem] border-b-2 border-slate-300 overflow-hidden">
          <Image
            src={P403}
            alt="403"
            height={400}
            width={450}
            unoptimized
            className="translate-y-12 "
          />
        </div>

        <div className="text-center py-8 space-y-4 ">
          <h2 className="text-4xl font-bold text-[#3C414B] ">
            We are sorry...
          </h2>
          <p className="text-[#64676F] ">
            The page you&apos;re trying to access has restricted access.
            <br></br> Please refer to your system administrator.
          </p>

          <div className="mx-auto pt-4">
            <Link
              href={"/"}
              className="py-2 px-6 bg-[#407BFF] text-white shadow-lg rounded-full"
            >
              Go Back
            </Link>
          </div>
        </div>
        <footer className=" text-center mt-4">
          <p>&copy; 2023 MorningBreeze. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
