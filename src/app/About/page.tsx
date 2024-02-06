import React from "react";
import { Nunito, Dosis } from "next/font/google";
import Navbar from "@/components/navbar/Hero-Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Logo from "@/assets/bg-mountains.jpg";

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

export default function AboutPage() {
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
                className="font-bold text-5xl text-dark_blue"
              >
                ABOUT US
              </h2>
            </header>

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
            <div className="pb-24 bg-white">
              <div className="w-[80%] mx-auto gap-x-4 grid grid-cols-2 items-center">
                <article className="h-max px-6">
                  <h4
                    style={dosis.style}
                    className=" font-bold text-4xl text-dark_blue mb-4"
                  >
                    ABOUT OUR COMPANY
                  </h4>
                  <h6
                    style={dosis.style}
                    className=" text-light_blue font-semibold text-3xl mb-10"
                  >
                    &quot;We are delivering water&quot;.
                  </h6>

                  <p className="text-lg">
                    <span className="text-light_blue font-[900] mr-3">
                      <strong>|</strong>
                    </span>
                    Our company was founded in 2008. Water Brand bottle is great
                    for drinking, cooking, activities, and even for children.
                    The product is certified in 50 countries.
                  </p>
                </article>

                <figure className="w-full">
                  <Image
                    src={Logo}
                    alt="Logo"
                    height={150}
                    width={150}
                    unoptimized
                    className="aspect-video w-full rounded-xl"
                  />
                </figure>
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
