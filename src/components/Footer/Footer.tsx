import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <>
      <section className="w-[90%] lg:w-[70%]  mx-auto grid lg:grid-cols-3 gap-y-12  border-b border-slate-500 pb-10">
        <div className="space-y-4 grid">
          <h5 className=" font-bold text-lg">
            <span className="text-light_blue font-[900] mr-2">
              <strong>|</strong>
            </span>
            Menu
          </h5>

          <Link href={"/"} className="text-sm">
            Home
          </Link>
          <Link href={"/About"} className="text-sm">
            About
          </Link>
          <Link href={"/Services"} className="text-sm">
            Services
          </Link>
          <Link href={"/Products"} className="text-sm">
            Products
          </Link>
          <Link href={"/Contact-Us"} className="text-sm">
            Contact Us
          </Link>
          <Link href={"/FAQ"} className="text-sm">
            FAQ
          </Link>
        </div>

        <div className="space-y-9 ">
          <article className="space-y-3">
            <h5 className="font-bold text-lg">
              <span className="text-light_blue font-[900] mr-2">
                <strong>|</strong>
              </span>
              Contact Us
            </h5>

            <div className="text-sm space-y-2">
              <p>Purok 3, 914 Mamatid Cabuyao, Laguna</p>
              <p>
                Call Us: <span className="font-bold">0956-354-1333</span>
              </p>
            </div>
          </article>

          <article className="space-y-3">
            <h5 className="font-bold ">
              <span className="text-light_blue font-[900] mr-2">
                <strong>|</strong>
              </span>
              Social Links
            </h5>

            <div className="flex space-x-4">
              <div className="p-2 bg-light_blue rounded-full cursor-pointer hover:scale-110 transition-all duration-150">
                <FaFacebookF />
              </div>
              <div className="p-2 bg-light_blue rounded-full cursor-pointer hover:scale-110 transition-all duration-150">
                <FaSquareInstagram />
              </div>
              <div className="p-2 bg-light_blue rounded-full cursor-pointer hover:scale-110 transition-all duration-150">
                <FaTiktok />
              </div>
            </div>
          </article>
        </div>

        <div className="space-y-4">
          <h5 className="font-bold text-lg">
            <span className="text-light_blue font-[900] mr-2">
              <strong>|</strong>
            </span>
            Subscribed
          </h5>

          <Input
            type="email"
            placeholder="Your email address"
            className="max-w-xs"
          />
          <Button className="self-end">Subscribe</Button>
        </div>
      </section>

      <div className="flex justify-center py-4">
        <p className="text-sm">&copy; 2024 GerChie. All rights reserved.</p>
      </div>
    </>
  );
}
