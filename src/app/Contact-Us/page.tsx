import React from "react";
import { Nunito, Dosis } from "next/font/google";
import Navbar from "@/components/navbar/Hero-Navbar";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import ContactForm from "./_components/form";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  // weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const dosis = Dosis({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  // weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dosis",
});

export default function ContactPage() {
  return (
    <>
      <main className="h-max w-full bg-white ">
        <section
          style={nunito.style}
          className="relative w-full h-max bg-gradient-to-t from-sky-50 via-sky-100 to-sky-200"
        >
          <Navbar />

          <div className="container mx-auto relative py-8">
            <h3
              style={dosis.style}
              className="text-4xl md:text-5xl  font-bold text-light_blue text-center"
            >
              CONTACT <span className="text-dark_blue">INFORMATION</span>
            </h3>

            <div
              style={nunito.style}
              className="md:w-[80%] w-full mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-8 "
            >
              {/* upper left box */}
              <div className="order-1 lg:order-none w-full bg-white p-8 space-y-6 rounded-md shadow-light_blue/40 shadow-xl">
                <p className=" font-semibold">
                  <span className="text-light_blue font-[900] mr-2">
                    <strong>|</strong>
                  </span>
                  Cabuyao Branch
                </p>

                <div className=" flex gap-4 font-semibold">
                  <div className="space-y-6 text-slate-600">
                    <SlLocationPin size={20} />
                    <BsTelephone size={20} />
                    <AiOutlineMail size={20} />
                  </div>
                  <article className="space-y-6 text-slate-600 text-sm ">
                    <p>25 W 51st St, New York, NY 10019</p>
                    <p>+63 991 330 7281</p>
                    <p>breezewater@water.com</p>
                  </article>
                </div>
              </div>

              {/* right box */}
              <ContactForm />

              {/* bottom left box */}
              <div
                style={nunito.style}
                className="order-2 lg:order-none bg-white px-8 pt-8 pb-4 space-y-4 rounded-md shadow-light_blue/40 shadow-xl"
              >
                <p className=" font-semibold">
                  <span className="text-light_blue font-[900] mr-2">
                    <strong>|</strong>
                  </span>
                  Opening hours
                </p>

                <article className="text-slate-600 text-sm space-y-6">
                  <p>
                    <span className="">
                      <strong>Monday</strong>
                    </span>
                    : 8:00 – 5:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Tuesday</strong>
                    </span>
                    : 8:00 – 5:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Wednesday</strong>
                    </span>
                    : 8:00 – 5:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Thursday</strong>
                    </span>
                    : 8:00 – 5:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Friday</strong>
                    </span>
                    : 8:00 – 5:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Saturday</strong>
                    </span>
                    : 8:00 – 12:00
                  </p>
                  <p>
                    <span className="">
                      <strong>Sunday</strong>
                    </span>
                    : 8:00 – 12:00
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
