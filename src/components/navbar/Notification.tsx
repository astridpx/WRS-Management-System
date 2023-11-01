import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Unknown from "@/assets/question_mark.png";

export default function Notification({ img, title, body, time, date }: any) {
  return (
    <>
      <div className="px-3 text-sm py-3 text-gray-600 flex gap-x-2">
        <Avatar className="h-[3rem] w-[3rem]">
          <AvatarImage src={img ? img : Unknown.src} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <article className="space-y-2">
          <p>
            <span className="font-semibold">{title}</span> {body}
          </p>
          <p className="text-">10hrs ago</p>
        </article>
      </div>
    </>
  );
}
