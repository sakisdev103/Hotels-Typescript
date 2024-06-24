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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Icon
import { Calendar as CalendarIcon } from "lucide-react";

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

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
