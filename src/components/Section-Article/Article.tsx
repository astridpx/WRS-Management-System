import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Article({
  dosis,
  img,
  title,
  titleSpan,
  subTitle,
  body,
  imgOrder,
  articleOrder,
}: any) {
  return (
    <>
      <div className="md:w-[75%] mx-auto grid gap-y-8 md:grid-cols-2 ">
        <Image
          src={img}
          alt="Delivery Boy"
          height={573}
          width={424}
          unoptimized
          className={`mx-auto ${imgOrder}`}
        />

        <article
          className={`${articleOrder} space-y-8 text-center md:text-start md:pr-4  text-dark_blue`}
        >
          <header className="space-y-2">
            <h3 style={dosis.style} className="text-5xl  font-bold">
              {title} <span className="text-light_blue">{titleSpan}</span>
            </h3>
            <h4 className="tracking-[1.5px] font-medium">{subTitle}</h4>
          </header>

          <p className="text-lg">{body}</p>
          <Link
            href={"/"}
            className="flex items-center gap-x-2 text-xl text-light_blue font-bold hover:text-dark_blue duration-150 transition-colors"
          >
            Read more
            <FaLongArrowAltRight size={22} />
          </Link>
        </article>
      </div>
    </>
  );
}
