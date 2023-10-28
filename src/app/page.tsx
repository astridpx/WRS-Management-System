"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Hero-Navbar";
import { Nunito, Dosis } from "next/font/google";
import Wave from "@/assets/landingPage/Vector-2.png";
import { Button } from "@/components/ui/button";
import LgScreenHero from "@/components/Hero/Lg-Screen-Hero";
import MobileHero from "@/components/Hero/Mobile-Hero";

// body font
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dosis",
});

export default function HomePage() {
  return (
    <>
      <main className="h-max w-full bg-sky-100 ">
        <section
          style={nunito.style}
          className="relative w-full h-max bg-gradient-to-t from-sky-50 via-sky-100 to-sky-200"
        >
          <Navbar />

          {/* HERO SECTION */}
          <LgScreenHero dosis={dosis} />
          <MobileHero dosis={dosis} />

          {/* Wave bottom */}
          <div className="h-[15rem] w-full flex items-end">
            <Image
              src={Wave}
              alt="Wave"
              height={200}
              width={300}
              unoptimized
              className="w-full h-[35rem] "
            />
          </div>
        </section>

        {/* section */}
        <section className="h-screen w-full bg-white"></section>
      </main>
    </>
  );
}
