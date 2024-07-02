import * as React from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/state/store";
import { updateDates } from "@/state/dates/datesSlice";

import { format } from "date-fns";
import { DateRange } from "react-day-picker";

//Ui
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Dates({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const initialRange = useSelector((state: RootState) => state.dates);
  const [date, setDate] = React.useState<DateRange | undefined>(initialRange);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (initialRange !== date) {
      if (date?.from !== undefined && date.to !== undefined) {
        dispatch(
          updateDates({
            from: format(date?.from as Date, "LLL dd, y"),
            to: format(date?.to as Date, "LLL dd, y"),
          })
        );
      }
    }
  }, [date]);

  const [calendarOpen, setCalendarOpen] = React.useState(true);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger />
        <PopoverContent className="w-auto " sideOffset={-15}>
          <Calendar
            initialFocus
            mode="range"
            disabled={{ before: new Date() }}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
