"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo2.png";
import { Nunito, Dosis } from "next/font/google";
import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";

// body font
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-nunito",
});

const dosis = Dosis({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-dosis",
});

export default function HeroNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* NAVBAR  */}
      <nav
        className={`${
          isOpen && "animate-menu-bg "
        }  container md:animate-none md:bg-transparent py-1 mx-auto flex items-center justify-between md:px-8 px-2 `}
      >
        <Image
          src={Logo}
          alt="Logo"
          height={150}
          width={150}
          unoptimized
          className="n h-16 w-16 "
        />

        <div className="hidden md:flex items-center gap-x-6 text-sm font-medium text-[#081f46]">
          <Link href={"/"}>Home</Link>
          <Link href={"/About"}>About</Link>
          <Link href={"/Services"}>Service</Link>
          <Link href={"/Products"}>Products</Link>
          <Link href={"/FAQ"}>FAQ</Link>
          <Link href={"/Contact-Us"}>Contact</Link>
        </div>

        <Link
          href={"/Login"}
          className="hidden md:block text-white font-semibold rounded-full py-2 px-8 btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-all"
        >
          Sign In
        </Link>

        {!isOpen ? (
          <CiMenuFries
            size={24}
            className="md:hidden cursor-pointer text-dark_blue"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <MdOutlineClose
            size={24}
            className="md:hidden cursor-pointer text-dark_blue"
            onClick={() => setIsOpen(false)}
          />
        )}
      </nav>

      {/* Mobile navbar menu */}
      <div
        className={`${
          isOpen ? "block w-full" : "hidden w-0 "
        } animate-menu-bg  md:hidden p-4 space-y-8 h-screen`}
      >
        <div className="relative">
          <CiSearch
            size={20}
            className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground "
          />
          <Input
            placeholder="Search here..."
            className="pl-8 rounded-2xl bg-[#f5f5f7]  "
          />
        </div>

        <nav className=" h-full flex flex-col space-y-3s items-start p-2">
          <Separator />
          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/"}
          >
            Home
          </Link>
          <Separator />

          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/About"}
          >
            About
          </Link>
          <Separator />

          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/Services"}
          >
            Service
          </Link>
          <Separator />

          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/Products"}
          >
            Products
          </Link>
          <Separator />

          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/FAQ"}
          >
            FAQ
            <Separator />
          </Link>

          <Link
            className="hover:bg-light_blue/20 hover:text-blue-500 rounded-xl w-full p-4 font-medium"
            style={nunito.style}
            href={"/Contact-Us"}
          >
            Contact
          </Link>
          <Separator />
        </nav>
      </div>
    </>
  );
}
