"use client";

import React, { useEffect, useRef, useState } from "react";
import { ICard } from "@/utils/Dashboard/DashboardCards-data";
import { animate } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/UseAnimateCounter";

export const DashBoardCard = ({
  icon,
  iconBg,
  iconColor,
  amount,
  title,
}: ICard) => {
  const counter = useAnimatedCounter(amount);

  return (
    <>
      <div className="relative h-30 rounded-xl p-4 border bg-white flex items-center gap-x-4">
        <div className={` ${iconBg} p-4 rounded-full`}>
          {/* <{{...icon}} size={30} className="text-blue-600 font-semibold" /> */}
          {React.createElement(icon, {
            size: 30,
            className: `${iconColor} font-semibold`,
          })}
        </div>
        <div className="space-y-1  ">
          <h2 className="text-xl font-semibold">
            Php {counter.toLocaleString()}
          </h2>
          <h2 className="text-sm">{title}</h2>
        </div>
      </div>
    </>
  );
};
