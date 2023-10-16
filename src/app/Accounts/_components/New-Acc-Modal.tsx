"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiShow, BiHide } from "react-icons/bi";

interface IAccModal {
  modal: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewAccModal({ modal, toggleModal }: IAccModal) {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showCPass, setShowCPass] = useState<boolean>(false);

  return (
    <>
      <section
        className={`${
          modal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full  flex items-center justify-center py-4   ">
          <main className="relative  max-w-4xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ml-3 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
              Create New Account
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="first_name"
                    required
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="last_name"
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="username"
                    required
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/*  */}
              <div className="col-span-3">
                <label
                  htmlFor="pass"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2 relative flex items-center">
                  <div
                    className=" absolute h-[97%] w-12 right-1 text-slate-400 bg-white flex items-center justify-center cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <BiShow size={20} /> : <BiHide size={20} />}
                  </div>
                  <Input
                    type={showPass ? "text" : "password"}
                    name="pass"
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="cpass"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 relative flex items-center">
                  <div
                    className=" absolute h-[97%] w-12 right-1 text-slate-400 bg-white flex items-center justify-center cursor-pointer"
                    onClick={() => setShowCPass(!showCPass)}
                  >
                    {showCPass ? <BiShow size={20} /> : <BiHide size={20} />}
                  </div>
                  <Input
                    type={showCPass ? "text" : "password"}
                    name="cpass"
                    required
                    placeholder="Confirm password"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON FOOTER */}
            <div className=" flex justify-end space-x-4 mt-8">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  toggleModal(false);
                }}

                // className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // className="bg-blue-500 hover:bg-blue-600"
              >
                Save
              </Button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
