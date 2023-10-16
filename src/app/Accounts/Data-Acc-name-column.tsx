import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Iname {
  name: string;
  img: string;
}

export function DataAccNameColumn({ name, img }: Iname) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={img} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{name}</p>
      </div>
    </>
  );
}
