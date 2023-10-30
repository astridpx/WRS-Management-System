import React from "react";
import Image from "next/image";
import h2o from "@/assets/h2o.jpg";
import waterbottles from "@/assets/water-bottles.jpg";
import wave2 from "@/assets/wave2.png";
import LoginForm from "./Login-Form";

export default function LoginPage() {
  return (
    <>
      <main className="h-screen w-full grid grid-cols-5">
        <section className="col-span-3 relative">
          <Image
            // src={falls}
            // src={waterbottles}
            src={h2o}
            // src={glassWinter}
            alt="bg-login"
            height={300}
            width={250}
            unoptimized
            className="h-full w-full object-cover "
          />
          <div className="flex items-start justify-end h-full w-full top-0 overflow-hidden bg-blue-600/70 absolute">
            <Image
              src={wave2}
              alt="bg-login"
              height={300}
              // height={700}
              width={600}
              unoptimized
              className="h-full w-[35rem] -rostate-90"
            />
          </div>
        </section>

        <section className="col-span-2  bg-white flex justify-center items-center ">
          <div className="p-4 w-[80%] space-y-28">
            <header className="text-4xl font-semibold">
              <h2 className=" text-dark_blue">Hello,</h2>
              <h2 className=" text-light_blue">Welcome Back :)</h2>
            </header>

            {/* FORM HERE */}
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}
