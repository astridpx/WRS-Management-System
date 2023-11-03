"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export const useAnimatedCounter = (maxValue: number) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const controls = animate(0, maxValue, {
      duration: 1,
      onUpdate(value) {
        setCounter(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [maxValue]);

  return counter;
};
