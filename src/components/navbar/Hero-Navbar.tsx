import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo2.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { RiMenu5Fill } from "react-icons/ri";

export default function HeroNavbar() {
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between md:px-8 px-2 ">
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
          <Link href={"/"}>Service</Link>
          <Link href={"/"}>Product</Link>
          <Link href={"/"}>FAQ</Link>
          <Link href={"/Contact-Us"}>Contact</Link>
        </div>

        <Link
          href={"/Login"}
          className="hidden md:block text-white font-semibold rounded-full py-2 px-8 btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-all"
        >
          Sign In
        </Link>

        <RiMenu5Fill size={25} className="md:hidden " />
      </nav>
    </>
  );
}
