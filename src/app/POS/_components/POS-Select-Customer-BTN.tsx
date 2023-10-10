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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

export const POSSelectCustomerBTN = () => {
  const { toggleShowSelect, selectedCustomer, customer } = POSBTNHeaderStore();
  const { setService } = POSPaymentModal();

  const person = Array.isArray(customer) ? customer.map((d) => d) : customer;

  const getTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString("PST");
  };

  return (
    <>
      <div className="py-4 px-2  flex gap-x-4">
        <div className={`flex-grow  flex items-center justify-center`}>
          {!selectedCustomer ? (
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
                <h3 className="font-semibold">{person.fullname}</h3>
              </div>
              <div className="flex gap-x-2 text-sm text-gray-400  ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent>
                      <p>{person.comment}</p>
                    </TooltipContent>

                    <TooltipTrigger>
                      <p className="flex gap-x-2  max-w-sms">
                        <MdContactEmergency
                          size={18}
                          className="text-gray-500 "
                        />
                        <span className="inline-block overflow-hidden whitespace-nowrap text-ellipsis  truncate max-w-[14rem]">
                          {person.comment ? person.comment : "No comment"}
                        </span>
                      </p>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent>{person.new_address}</TooltipContent>

                    <TooltipTrigger>
                      <p className="flex gap-x-1  max-w-sms">
                        <MdLocationPin size={18} className="text-gray-500 " />
                        <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis  truncate max-w-[14rem]">
                          {person.new_address}
                        </span>
                      </p>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* SERVICES TYPE */}
        <div className="w-40 space-y-2">
          <Select
            name="role"
            defaultValue="Deliver"
            onValueChange={(e) => setService(e)}
          >
            <SelectTrigger className="text-center ">
              <SelectValue placeholder="Select Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Deliver">Deliver</SelectItem>
                <SelectItem value="PickUp">Pick Up</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input type="time" onClick={() => alert(getTime())} />
        </div>
      </div>
    </>
  );
};
