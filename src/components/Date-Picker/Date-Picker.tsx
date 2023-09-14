"use client";

import * as React from "react";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ICalendar {
  variant?: any;
  calendar_width?: string;
  calendar_text?: string;
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({
  calendar_width,
  calendar_text,
  date,
  setDate,
  variant,
}: ICalendar) {
  //   const [date, setDate] = React.useState<Date| undefined>(dateValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            `${
              calendar_width ? calendar_width : "w-[280px]"
            } justify-start text-left font-normal`,
            !date && "text-muted-foreground"
          )}
        >
          <AiOutlineCalendar className="mr-2 h-4 w-4" />
          {date ? format(date, "LLL dd, y") : <span>{calendar_text}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("2022-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
