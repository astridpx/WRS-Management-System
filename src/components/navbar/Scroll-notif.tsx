import React from "react";
import { connectDB } from "@/lib/mongodb/config/connect-db";
import { Notif } from "@/lib/mongodb/model/Notifications.model";
import Notification from "./Notification";
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
import { IoMdNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Unknown from "@/assets/question_mark.png";

const GetNotif = async () => {
  const notification = await Notif.find().sort({ date: -1 }).lean();

  return notification;
};

const ScrollNotif = async () => {
  const notif = await GetNotif();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-0 focus:outline-none">
          <Badge
            // variant="secondary"
            className="rounded-3xl relative"
          >
            <IoMdNotificationsOutline
              size={23}
              className="relative cursor-pointer"
            />
            <span className="px-1 absolute z-10  text-[10px] bg-red-400 rounded-full -top-1 right-1">
              10
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
            <p className="text-xs bg-sky-100 text-sky-500 dark:bg-[#1B2C32]  px-2 py-1 rounded-full">
              10 Unread
            </p>
          </DropdownMenuLabel>

          <Separator />

          <ScrollArea className="h-80  w-full">
            {notif
              ? notif.map((n: any) => {
                  return (
                    <>
                      <div className="px-3 text-sm py-3 text-gray-600 flex gap-x-2">
                        <Avatar className="h-[3rem] w-[3rem]">
                          <AvatarImage
                            src={n.img ? n.img : Unknown.src}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <article className="space-y-2">
                          <p>
                            <span className="font-semibold">{n.title}</span>
                            {n.body}
                          </p>
                          <p className="text-">10hrs ago</p>
                        </article>
                        <Separator />
                      </div>
                    </>
                  );
                })
              : "Loading..."}
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
    </>
  );
};

export default ScrollNotif;
