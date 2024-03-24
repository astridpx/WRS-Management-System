import React from "react";

function useNumberFormatter() {
  function formatNumber(num: number) {
    if (num < 1000) {
      return num.toString(); // No conversion needed for numbers less than 1000
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // Convert to thousands (1K, 2.5K, etc.)
    } else {
      return (num / 1000000).toFixed(1) + "M"; // Convert to millions (1M, 1.5M, etc.)
    }
  }

  return formatNumber;
}

export { useNumberFormatter };
