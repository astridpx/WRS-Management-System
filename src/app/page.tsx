// "use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Hero-Navbar";
import { Nunito, Dosis } from "next/font/google";
import Wave from "@/assets/landingPage/Vector-2.png";
import { Button } from "@/components/ui/button";
import LgScreenHero from "@/components/Hero/Lg-Screen-Hero";
import MobileHero from "@/components/Hero/Mobile-Hero";
import FigureArticle from "@/components/Section-Article/Article";
import { FigurArticleData } from "@/components/Section-Article/Article-data";
import WaveArticle from "@/assets/landingPage/Section-2-wave.svg";
import LineWave from "@/assets/landingPage/Wave.png";
import TechFigure from "@/components/our-Technology/Tech-Figure";
import { OurTechData } from "@/components/our-Technology/Our-Technology-data";
import ProductsWave from "@/assets/landingPage/choose-your.svg";
import { ProductsCardData } from "@/components/Choose-Water/Products-data";
import ProductCard from "@/components/Choose-Water/Cards";
import HowWorkWave from "@/assets/landingPage/how-it-work.svg";
import { FaLongArrowAltRight } from "react-icons/fa";
import HIWCard from "@/components/How-It-Works/HIW-Card";
import { HIWData } from "@/components/How-It-Works/HIW-Data";

// body font
const nunito = Nunito({
  subsets: ["latin"],
  // weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const dosis = Dosis({
  subsets: ["latin"],
  // weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dosis",
});

export default function HomePage() {
  return (
    <>
      <main className="h-max w-full bg-sky-100 ">
        {/* HERO SECTION */}
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

        {/*  ARTICLE ABOUT US */}
        <section style={nunito.style} className="h-max w-full bg-white pt-4">
          {/* section 2 comtainer */}
          <section className="container mx-auto space-y-[7rem] md:space-y-[10rem]">
            {FigurArticleData.map((data: any) => {
              return (
                <>
                  <FigureArticle
                    key={data.id}
                    dosis={dosis}
                    img={data.img}
                    title={data.title}
                    titleSpan={data.titleSpan}
                    subTitle={data.subTitle}
                    body={data.body}
                    imgOrder={data.imgOrder}
                    articleOrder={data.articleOrder}
                  />
                </>
              );
            })}
          </section>
        </section>

        {/* WAVE DIVIDER */}
        <div className="w-full h-[15rem] bg-gradient-to-r from-[#F9FCFF] to-[#FAFAFF] ">
          <Image
            src={WaveArticle}
            alt="wave"
            height={200}
            width={300}
            unoptimized
            className="h-full w-full"
          />
        </div>

        {/* OUR TECHNOLOGY*/}
        <section
          style={nunito.style}
          className="h-max w-full bg-gradient-to-r from-[#F9FCFF] to-[#FAFAFF] pt-4"
        >
          <article className="max-auto text-center space-y-5 mb-16">
            <h3
              style={dosis.style}
              className="text-5xl font-bold text-light_blue "
            >
              OUR <span className="text-dark_blue">TECHNOLOGY</span>
            </h3>
            <Image
              src={LineWave}
              alt="line-wave"
              height={100}
              width={110}
              unoptimized
              className="mx-auto"
            />
            <p className="w-[28rem] mx-auto">
              Our company was founded in 2008. Water Brand bottle is great for
              drinking, cooking, activities, and even for children. The product
              is certified in 50 countries.
            </p>
          </article>

          <div className="w-[68%] mx-auto grid lg:grid-cols-4 ">
            {OurTechData.map((data: any) => {
              return (
                <>
                  <TechFigure
                    key={data.id}
                    img={data.img}
                    label={data.label}
                    dosis={dosis}
                  />
                </>
              );
            })}
          </div>
        </section>

        {/* WAVE DIVIDER 2*/}
        <div className="w-full h-[15rem] bg-white ">
          <Image
            src={ProductsWave}
            alt="wave"
            height={200}
            width={700}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>

        {/* CHOOSE YOUR WATER*/}
        <section
          style={nunito.style}
          className="h-max w-full bg-white pt-[2rem] pb-[3rem] "
        >
          <header className="space-y-7 mb-8 text-center">
            <h3
              style={dosis.style}
              className="text-5xl font-bold text-light_blue "
            >
              CHOOSE YOUR <span className="text-dark_blue">WATER</span>
            </h3>
            <h4 className="tracking-[1.5px] font-medium">WATERS WE DELIVER</h4>
          </header>

          <div className="w-[25rem] lg:w-[75%] place-content-center mx-auto grid lg:grid-cols-3 gap-6">
            {ProductsCardData.map((data: any) => {
              return (
                <>
                  <ProductCard
                    key={data.id}
                    dosis={dosis}
                    img={data.img}
                    name={data.name}
                    orgPrice={data.orgPrice}
                    disPrice={data.disPrice}
                    height={data.height}
                    width={data.width}
                  />
                </>
              );
            })}
          </div>
        </section>

        {/* WAVE DIVIDER 3*/}
        <div className="w-full h-[15rem] bg-gradient-to-r from-[#F9FCFF] to-[#FAFAFF] ">
          <Image
            src={HowWorkWave}
            alt="wave"
            height={200}
            width={700}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>

        {/* HOW IT WORKS */}
        <section
          style={nunito.style}
          className="h-max w-full bg-gradient-to-r from-[#F9FCFF] to-[#FAFAFF] pt-[1rem] "
        >
          <header className="w-[75%] mx-auto grid grid-cols-2 items-center">
            <div className="space-y-4 ">
              <h3
                style={dosis.style}
                className="text-5xl font-bold text-light_blue "
              >
                HOW IT <span className="text-dark_blue">WORKS</span>
              </h3>
              <h4 className="tracking-[1.5px] font-medium">OUR PROCESS</h4>
            </div>

            <div className="space-y-3 w-[90%]">
              <p>
                Our refreshing purified bottled water can now be delivered
                directly to your door with our water delivery service.
              </p>

              <Link
                href={"/"}
                className="flex items-center gap-x-2 text-xl text-light_blue font-bold hover:text-dark_blue duration-150 transition-colors"
              >
                Read more
                <FaLongArrowAltRight size={22} />
              </Link>
            </div>
          </header>

          <div className="w-[70%] mx-auto grid grid-cols-4 items-center mt-[6rem]">
            {HIWData.map((d: any) => {
              return (
                <HIWCard
                  key={d.id}
                  id={d.id}
                  dosis={dosis}
                  img={d.img}
                  title={d.title}
                  title2={d.title2}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
