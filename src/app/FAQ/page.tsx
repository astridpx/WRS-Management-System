import React from "react";
import { Nunito, Dosis, Truculenta } from "next/font/google";
import Navbar from "@/components/navbar/Hero-Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Logo from "@/assets/bg-mountains.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function FAQPage() {
  return (
    <>
      <main className="h-max w-full bg-white ">
        <section
          style={nunito.style}
          className="relative w-full h-max bg-gradient-to-t from-sky-50 via-sky-100 to-sky-200"
        >
          <Navbar />

          <div className="relative">
            <header className="text-center py-16">
              <h2
                style={dosis.style}
                className="text-4xl md:text-5xl font-bold  text-dark_blue"
              >
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </header>
            {/* WAVE DIVIDER */}
            <svg
              className=""
              id="header-wave"
              viewBox="0 0 1440 125"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M1256 11.76C1237.2 17.26 1209.4 27.56 1170 25.76C1127.2 23.86 1125.3 10.16 1087 7.75998C1026.9 3.95998 1015 36.56 959 29.76C920.1 25.06 921.3 8.85998 884 7.75998C841.3 6.55998 834.4 27.66 790 27.76C749.8 27.86 748.5 10.66 707 9.75998C662.5 8.75998 658.2 28.46 611 31.76C563.1 35.06 560 15.26 504 13.76C452.5 12.36 450 28.96 396 29.76C336.7 30.56 332.6 9.35998 279.1 10.76C216.3 12.36 202.3 40.36 146 43.76C112.8 45.76 63 41.96 0 10.76V124.6H1440V10.76C1353.8 -7.34002 1294.8 0.459979 1256 11.76Z"
                  fill="white"
                ></path>
              </g>
            </svg>
            {/* END OF WAVE DIVIDER */}

            <div className="bg-white py-12">
              <div className="w-[90%] lg:w-[70%] p-8 rounded-xl shadow-lg shadow-blue-300 mx-auto bg-white">
                <Accordion
                  type="single"
                  defaultValue="q-1"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="q-1">
                    <AccordionTrigger className="hover:no-underline">
                      <p
                        style={dosis.style}
                        className="font-bold text-dark_blue text-xl"
                      >
                        <span className="text-light_blue font-[900] mr-2">
                          <strong>|</strong>
                        </span>
                        How can I pay for order?
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="">
                      At GerChie, payment is hassle free settle it after
                      we&apos;ve delivered your order. You get to inspect and
                      ensure satisfaction before making any payment. Choose your
                      preferred payment method post delivery.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q-2">
                    <AccordionTrigger className="hover:no-underline">
                      <p
                        style={dosis.style}
                        className="font-bold text-dark_blue text-xl"
                      >
                        <span className="text-light_blue font-[900] mr-2">
                          <strong>|</strong>
                        </span>
                        What if the prepaid order is not delivered?
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      For prepaid orders at our water refilling station, if
                      delivery issues arise, call us on{" "}
                      <strong>0956-354-1333</strong> or email on{" "}
                      <strong>gerchie@gmail.com</strong>. We&apos;ll swiftly
                      address the problem, ensuring you receive what you
                      ordered.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q-3">
                    <AccordionTrigger className="hover:no-underline">
                      <p
                        style={dosis.style}
                        className="font-bold text-dark_blue text-xl"
                      >
                        <span className="text-light_blue font-[900] mr-2">
                          <strong>|</strong>
                        </span>
                        How can I cancel the order?
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      You can cancel your order as long as it has not yet been
                      dispatched for delivery or until we have not sent you a
                      confirmation text. Once the order arrives, you will be
                      responsible for the transportation fee, which varies based
                      on the delivery distance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q-4">
                    <AccordionTrigger className="hover:no-underline">
                      <p
                        style={dosis.style}
                        className="font-bold text-dark_blue text-xl"
                      >
                        <span className="text-light_blue font-[900] mr-2">
                          <strong>|</strong>
                        </span>
                        Is it possible to return the product?
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      No, unfortunately, returns are not accepted. Due to the
                      nature of our products, we prioritize hygiene and safety
                      concerns. This policy ensures that each customer receives
                      only brand-new, uncontaminated items, maintaining the
                      highest standards of quality and safety.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q-5">
                    <AccordionTrigger className="hover:no-underline">
                      <p
                        style={dosis.style}
                        className="font-bold text-dark_blue text-xl"
                      >
                        <span className="text-light_blue font-[900] mr-2">
                          <strong>|</strong>
                        </span>
                        Is your water is safe?
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, our water is 100% safe for consumption. It has
                      successfully passed laboratory tests conducted by Cosmolab
                      Laboratories Inc., ensuring that it meets stringent
                      quality and safety standards. Your well-being is our top
                      priority, and we take every measure to provide you with
                      water of the highest quality
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer
            style={nunito.style}
            className="h-max w-full bg-dark_blue  text-slate-100 pt-[6rem] "
          >
            <Footer />
          </footer>
        </section>
      </main>
    </>
  );
}
