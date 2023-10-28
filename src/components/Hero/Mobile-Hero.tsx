import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Article = [
  {
    id: 1,
    title: "Laboratory tested",
    body: " Fresh water is necessary for survival of all living organisms on Earth.",
  },
  {
    id: 2,
    title: "Great composition",
    body: "Guarantees safe, clean water, ultimate convenience, sustainability, and trust. Join us for the best water experience!.",
  },
  {
    id: 3,
    title: "Nano filtration",
    body: "Efficient water treatment technology that offers multiple benefits, including selective removal of contaminants and improved water quality.",
  },
];

export default function MobileHero({ dosis }: any) {
  return (
    <>
      <div className="md:hidden  grid justify-centers container mx-auto relative pt-28 text-dark_blue">
        <article className="space-y-6 w-full items-center text-center flex flex-col justify-center ">
          <div
            style={dosis.style}
            className="text-5xl tracking-[2px] font-bold space-y-2"
          >
            <h2 className="text-dark_blue">READY TO GET </h2>
            <h2 className="text-light_blue">HYDRATED?</h2>
          </div>
          <p className="w-[60vw] py-2 text-xl ">
            <span className="text-light_blue font-[900] mr-3">
              <strong>|</strong>
            </span>
            To drink the best water please come to us and give us an order.
          </p>

          <div className="flex flex-col  gap-y-4">
            <Button
              type="button"
              onClick={() => alert("hello")}
              className="text-xl font-semibold rounded-full py-6 px-10 btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-shadow"
            >
              Order Now
            </Button>
            <Link
              href={"/"}
              className="text-xl font-semibold rounded-full py-3 px-8 bg-white shadow-lg shadow-blue-400 hover:text-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-all"
            >
              Read More
            </Link>
          </div>
        </article>

        <div className="mt-16 grid justify-center  text-center">
          {Article.map((data: any) => {
            return (
              <>
                <article key={data.id} className=" py-8 space-y-2">
                  <div>
                    <div className="flex w-ful justify-center mb-1">
                      <BsFillCheckCircleFill
                        size={28}
                        className=" text-light_blue"
                      />
                    </div>
                    <h2 className="font-bold text-xl">{data.title}</h2>
                  </div>
                  <p className="">{data.body}</p>
                </article>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
