import React from "react";
import { VscTriangleLeft } from "react-icons/vsc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IBM_Plex_Sans } from "next/font/google";
import Anonymous from "@/assets/anonymous.png";
import { format } from "date-fns";
import Unknown from "@/assets/question_mark.png";
import { formatDistanceToNow } from "date-fns";

// "IBM Plex Sans"
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Timeline({ title, img, body, date, time }: any) {
  return (
    <>
      <article className="relative">
        <div className="md:flex items-center md:space-x-8 mb-3 ">
          <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            {/* Icon */}
            <div className="border-[3px] border-[#6c5ffc] w-4 h-4 rounded-full bg-white shadow md:order-1"></div>
            {/* Date */}
            <div
              style={ibm.style}
              className="text-right font-medium text-xl text-[#8F8FB1] space-y-1 pr-2  w-28"
            >
              <p className="text-sm">{format(new Date(date), "dd MMM")}</p>
              <h5>{format(time, "h:mm a")}</h5>
            </div>
          </div>

          <div className="relative flex items-center bg-white  p-4 rounded-md border border-slate-200 text-slate-500 shadow ml-[5rem] md:ml-44">
            <VscTriangleLeft
              size={24}
              className="absolute -left-4 text-white"
            />
            {/* <div className="flex justify-between"> */}
            <div className="flex gap-x-3 w-[36rem]">
              <Avatar className="h-[2.8rem] w-[2.8rem] rounded-lg ">
                <AvatarImage src={img ? img : Unknown.src} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex-grow">
                <h5 className="flex justify-between items-center font-semibold">
                  {title}
                  <span className="text-xs font-normal">
                    {formatDistanceToNow(new Date(date), {
                      includeSeconds: true,
                      // addSuffix: true,
                    })}
                  </span>
                </h5>
                <p className="text-sm">{body}</p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </article>
    </>
  );
}
