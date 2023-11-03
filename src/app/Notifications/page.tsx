"use client";

import React, { useEffect, useState, useRef } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import Timeline from "./_components/Timeline";
import Link from "next/link";
import { getAllNotifications } from "./services/api";
import { useQuery, useQueryClient } from "react-query";
import Loader from "@/components/loader/Spinner";
import { parse } from "date-fns";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { SlArrowUp } from "react-icons/sl";

export default function NotificationPage() {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
  const topElementRef = useRef<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const containerRef = document.getElementById("container");

    if (containerRef) {
      containerRef.addEventListener("scroll", () => {
        const scrollAmount = containerRef.scrollTop;

        if (scrollAmount > 200) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });

      return () => {
        const scrollAmount = containerRef.scrollTop;
        containerRef.removeEventListener("scroll", () => {
          if (scrollAmount > 200) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      };
    }
  }, []);

  const scrollToTop = () => {
    if (topElementRef.current) {
      topElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <PageWrapper>
        <div
          onClick={scrollToTop}
          className={`${
            showButton ? "block" : "hidden"
          } p-4 cursor-pointer z-10 bg-blue-600 rounded-xl shadow-xl absolute bottom-4 right-8`}
        >
          <SlArrowUp size={20} className="text-white font-bold" />
        </div>

        <main className="relative h-max msin-h-screen flex flex-col justify-center  ">
          <header className="flex justify-between p-4 " ref={topElementRef}>
            <h3 className="font-medium text-slate-500 text-xl">
              Notifications List
            </h3>

            <div className="flex text-sm space-x-2 text-slate-400">
              <span>
                <Link href={"/Dashboard"}>Home</Link>
              </span>
              <span>/</span>

              <span className="text-blue-400">
                <Link href={"/Notifications"}>Notification List</Link>
              </span>
            </div>
          </header>

          <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-0 ">
            <div className=" flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-8">
              <div className="w-full max-w-3xl mx-auto">
                {/* Vertical Timeline */}
                <div
                  className={`space-y-8 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:ml-[7.9rem] md:before:translate-x-0 before:h-full ${
                    isSuccess ? "before:w-[3px]" : "before:w-[0px]"
                  } before:bg-[#D6D3F6] `}
                >
                  {/* Item #1 */}
                  {!isSuccess ? (
                    <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
                      <Loader />
                      <p className="text-gray-400 ">Loading...</p>
                    </div>
                  ) : (
                    data.map((d: any) => {
                      return (
                        <>
                          <Timeline
                            key={d._id}
                            title={d.title}
                            img={d.img}
                            body={d.body}
                            date={d.date}
                            time={parse(d.time, "h:mm:ss a", new Date())}
                          />
                        </>
                      );
                    })
                  )}
                </div>
                {/* End: Vertical Timeline #3 */}
              </div>
            </div>
          </section>
        </main>
      </PageWrapper>
    </>
  );
}
