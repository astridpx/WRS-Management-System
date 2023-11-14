import React from "react";

export const Stepper = ({ id, step, icon, title }: any) => {
  return (
    <>
      <div
        className={`${
          id <= step ? "border-blue-500" : "border-gray-300"
        } flex-auto border-t-2 transition duration-500 ease-in-out `}
      />

      <div
        className={`${
          id <= step ? "text-blue-500" : "text-gray-500"
        }  flex items-center justify-center relative`}
      >
        <div
          className={`${
            id <= step ? "border-blue-500" : "border-gray-300"
          } rounded-full flex items-center justify-center transition duration-500 ease-in-out p-2 border-2 `}
        >
          {React.createElement(icon, { size: 18 })}
        </div>
        <div
          className={`${
            id <= step ? "text-blue-500" : "text-gray-500"
          } absolute top-0  text-center mt-12 w-32 text-xs font-medium uppercase `}
        >
          {title}
        </div>
      </div>
    </>
  );
};
