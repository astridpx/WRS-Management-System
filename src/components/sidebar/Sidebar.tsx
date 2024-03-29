"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarItems } from "@/utils/sidebar-data/sidebar-data";
import Link from "next/link";
import Image from "next/image";
import WaterDrop from "@/assets/morning-breeze-water-drop.png";
import useSidebarStore from "@/lib/zustand/sidebar-store/sidebar-store";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { UserStore } from "@/lib/zustand/User/user.store";
import { ForceChangePasswordModal } from "../Force-Change-Password/Force-Change-Password-Modal";

export default function Sidebar() {
  const { isExpand } = useSidebarStore();
  const currentRoute = usePathname();
  const { clearUser, setUser, user } = UserStore();
  const staffAllowPath = [
    "/Dashboard",
    "/POS",
    "/Delivery",
    "/Orders",
    "/Monitoring",
    "/Settings",
  ];
  const guestAllowPath = [
    "/Client",
    "/MyOrders",
    "/Purchase-History",
    "/MyProfile",
  ];

  return (
    <>
      <ForceChangePasswordModal />

      <aside
        className={`h-screen bg-white ${
          isExpand ? "w-[21rem]" : "w-[5rem]"
        } dark:bg-dark_bg`}
      >
        <div className="h-[10vh] p-4  flex items-center space-x-4">
          <Image
            src={WaterDrop}
            alt="Logo Image"
            unoptimized
            className={`${
              isExpand ? "h-14 w-max" : "h-10 w-max"
            } ml-2 cursor-pointer`}
          />
          {/* // ? font style is brownmen curve bc */}
          <h1
            className={`text-lg font-bold text-gray-800 dark:text-gray-300 grid ${
              !isExpand && "hidden"
            }`}
          >
            GerChie Station
            <br />
            <span className="text-xs font-medium">Water Management System</span>
          </h1>
        </div>

        <Separator />

        <div className="h-[90vh] font-medium">
          <ScrollArea className="h-full w-full px-4 py-4">
            {sidebarItems.map((items) => {
              return (
                <>
                  <h1
                    key={items.key}
                    className={`text-base text-blue-500 ml-3 my-2  ${
                      !isExpand ? "hidden" : ""
                    }`}
                  >
                    {items.title}
                  </h1>

                  {/* Items */}
                  {items.items
                    .filter(
                      (url: any) =>
                        user &&
                        (user.role === "staff"
                          ? staffAllowPath.includes(url.path)
                          : user.role === "guest"
                          ? guestAllowPath.includes(url.path)
                          : !guestAllowPath.includes(url.path))
                    )
                    .map((list) => {
                      return (
                        <>
                          <Link
                            key={list.id}
                            href={list.path}
                            className={`${
                              currentRoute === list.path
                                ? "dark:bg-[#1E293B] text-blue-500 "
                                : "text-gray-500"
                            }  relative flex items-center px-3 py-3 cursor-pointer rounded-xl  hover:text-blue-500 `}
                          >
                            {React.createElement(list.icon, {
                              size: `${isExpand ? 20 : 22}`,
                              className: "mr-4  ",
                            })}
                            {/* //? IT WILL BE HIDDEn IF THE SIDEBAR IS MINIMIZE */}
                            <h1 className={`  ${!isExpand && "hidden"}`}>
                              {list.name}
                            </h1>
                          </Link>
                        </>
                      );
                    })}
                </>
              );
            })}
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
