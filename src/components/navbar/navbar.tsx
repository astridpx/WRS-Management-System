"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { BiMoon, BiSun } from "react-icons/bi";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import useSidebarStore from "@/lib/zustand/sidebar-store/sidebar-store";
import { useTheme } from "next-themes";
import { UserStore } from "@/lib/zustand/User/user.store";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient, useQueries } from "react-query";
import axios from "axios";
import Notification from "./Notification";
import Link from "next/link";

export default function Navbar() {
  const queryClient = useQueryClient();
  const { toggleSidebar, isExpand } = useSidebarStore();
  const { clearUser, setUser, user } = UserStore();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const result = useQueries([
    {
      queryKey: ["myProfile"],
      queryFn: async () => {
        const accId = session?.user?._id;

        const { data } = await axios.post("/api/accounts/profile", {
          accId: user._id ? user._id : accId,
        });

        return data.data;
      },
    },
    {
      queryKey: ["notifications"],
      queryFn: async () => {
        const { data } = await axios.get("/api/notifications");

        return data.data;
      },
    },
  ]);

  const profile = result[0]?.data;
  const notif = result[1]?.data;

  const profileIsLoading = result[0].isSuccess;
  const notifIsLoading = result[1].isSuccess;

  // UPDATE NOTIFICATION VIEWED
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data: response } = await axios.post("/api/notifications/viewed");

      return response;
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.message);
    },
  });

  const HandleNotifViewed = async () => {
    await mutateAsync();
  };

  return (
    <>
      <nav className="h-[10vh] w-full px-4 bg-white border flex justify-between z-10 sticky top-0  dark:bg-dark_bg">
        <div className="flex items-center">
          <Toggle
            onClick={() => {
              toggleSidebar(!isExpand);
            }}
          >
            <HiOutlineMenuAlt2
              size={26}
              className="cursor-pointer text-gray-500  dark:text-gray-300"
            />
          </Toggle>
        </div>

        <div className="flex items-center space-x-4">
          {theme === "dark" ? (
            <Badge
              className="rounded-3xl cursor-pointer"
              onClick={() => {
                setTheme("light");
              }}
            >
              <BiSun size={23} />
            </Badge>
          ) : (
            <Badge
              className="rounded-3xl cursor-pointer"
              onClick={() => {
                setTheme("dark");
              }}
            >
              <BiMoon size={23} />
            </Badge>
          )}

          <div>
            <DropdownMenu
              onOpenChange={(value) => {
                if (value) {
                  HandleNotifViewed();
                } else {
                  queryClient.invalidateQueries({
                    queryKey: ["notifications"],
                  });
                }
              }}
            >
              <DropdownMenuTrigger className="focus:outline-0 focus:outline-none">
                <Badge
                  // variant="secondary"
                  className="rounded-3xl relative"
                >
                  <IoMdNotificationsOutline
                    size={23}
                    className="relative cursor-pointer"
                  />
                  <span
                    className={`${
                      notifIsLoading &&
                      notif.filter((n: any) => n.isView === false).length ===
                        0 &&
                      "hidden"
                    } px-1 absolute z-10  text-[10px] bg-red-400 rounded-full -top-1 right-1`}
                  >
                    {notifIsLoading &&
                      notif.filter((n: any) => n.isView === false).length}
                  </span>
                </Badge>
              </DropdownMenuTrigger>

              {/* NOTIFICATION DROPDOWN */}
              <DropdownMenuContent
                className="h-max w-[25rem]  "
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="py-4 sticky top-0 w-full flex justify-between  ">
                  <h4 className="text-base font-medium leading-none">
                    Notifications
                  </h4>
                  <p
                    className={`${
                      notifIsLoading &&
                      notif.filter((n: any) => n.isView === false).length ===
                        0 &&
                      "hidden"
                    } text-xs bg-sky-100 text-sky-500 dark:bg-[#1B2C32]  px-2 py-1 rounded-full`}
                  >
                    {notifIsLoading &&
                      notif.filter((n: any) => n.isView === false).length}{" "}
                    Unread
                  </p>
                </DropdownMenuLabel>

                <Separator />

                <ScrollArea className="h-80  w-full">
                  <div className="pb-1 ">
                    {notifIsLoading
                      ? notif.slice(0, 10).map((i: any) => {
                          return (
                            <>
                              <Notification
                                img={i.img}
                                title={i.title}
                                body={i.body}
                                time={i.time}
                                date={i.date}
                              />
                              <Separator />
                            </>
                          );
                        })
                      : "Loading..."}
                  </div>
                </ScrollArea>
                <div className="flex p-2 shadow  justify-end">
                  <Link
                    href={"/Notifications"}
                    className="text-right underline text-blue-400"
                  >
                    View All
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-0 focus:outline-none">
              <div className="h-[10vh] flex items-center px-2 space-x-4 focus:outline-0 focus:outline-none border-none cursor-pointer">
                <div className="flex flex-col justify-end text-right leading-6 ">
                  <h1 className="capitalize text-gray-700 dark:text-gray-300">
                    {profileIsLoading
                      ? `${profile?.first_name} ${profile?.last_name}`
                      : "unknwon"}
                  </h1>
                  <p className="capitalize text-xs text-gray-600 dark:text-gray-400">
                    {profileIsLoading ? profile?.role : "unknwon"}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={profileIsLoading && profile?.img} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <IoIosArrowDown size={21} className="text-gray-400" />
                </div>
              </div>
            </DropdownMenuTrigger>

            {/* //? DROPDOWN MENU ITEMS */}
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profileIsLoading ? profile?.username : "unknown"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profileIsLoading ? profile?.email : "unknown"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={"/Settings"}>Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearUser();
                  signOut();
                }}
              >
                Log out
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {/* <Separator /> */}
    </>
  );
}
