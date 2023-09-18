"use client";

import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { GrUser } from "react-icons/gr";
import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";
import { MdLocationPin, MdContactEmergency } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { Input } from "@/components/ui/input";

export const POSSelectCustomerBTN = () => {
  const { toggleShowSelect, selectedCustomer } = POSBTNHeaderStore();

  const getTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString("PST");
  };

  return (
    <>
      <div className="py-4 px-2  flex gap-x-4">
        <div
          className={`flex-grow ${
            selectedCustomer && "bg-red-300"
          } flex items-center justify-center`}
        >
          {selectedCustomer ? (
            <button
              className="h-max w-max  text-2xl font-semibold flex  justify-between items-center gap-x-4"
              onClick={() => toggleShowSelect(true)}
            >
              <span>
                <LiaLessThanSolid size={28} />
              </span>
              <span>
                <FaUsers size={28} />
              </span>
              Select Customers
              <span>
                <LiaGreaterThanSolid size={28} />
              </span>
            </button>
          ) : (
            <div className="">
              <div
                className="flex justify-center items-center gap-x-2 text-2xl mb-2 text-gray-600 cursor-pointer  "
                onClick={() => toggleShowSelect(true)}
              >
                <FaUsers size={28} />
                <h3 className="font-semibold">Armando Witchalls</h3>
              </div>
              <div className="flex gap-x-2 text-sm text-gray-400">
                <p className="flex gap-x-2">
                  <span>
                    <MdContactEmergency size={18} className="text-gray-500 " />
                  </span>
                  George Pilay Kapitbahay ni Mang jose
                </p>
                <p className="flex gap-x-1">
                  <span>
                    <MdLocationPin size={18} className="text-gray-500 " />
                  </span>
                  P-1 BLK-1 L-14
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SERVICES TYPE */}
        <div className="w-40 space-y-2">
          <Select name="role" defaultValue="deliver">
            <SelectTrigger className="text-center ">
              <SelectValue placeholder="Select Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="deliver">Deliver</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input type="time" onClick={() => alert(getTime())} />
        </div>
      </div>
    </>
  );
};
