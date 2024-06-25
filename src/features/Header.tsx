//File
import Place from "@/components/Place";
import { Dates } from "@/components/Dates";
import Travelers from "@/components/Travelers";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

//Ui
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

//Icons
import { MapPin, Calendar, User } from "lucide-react";

import { format } from "date-fns";

const Header = () => {
  const { selectedCity } = useSelector((state: RootState) => state.city);
  const date = useSelector((state: RootState) => state.dates);
  const { adults_number, room_number } = useSelector(
    (state: RootState) => state.travelers
  );
  return (
    <div className="container my-4">
      <h1 className="text-4xl font-semibold">Where to?</h1>
      <div className="grid lg:grid-cols-4 gap-1 content-center items-center mx-auto my-5 p-1 bg-yellow-400 rounded-lg">
        <Popover>
          <PopoverTrigger className="flex items-center justify-center " asChild>
            <div className="text-center">
              <Button
                variant="outline"
                className="w-full flex justify-items-center justify-center gap-1"
              >
                <MapPin />
                {selectedCity ? selectedCity : "Where are you going?"}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Place />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="flex items-center justify-center " asChild>
            <div className="text-center">
              <Button
                variant="outline"
                className="w-full flex justify-items-center justify-center gap-1"
              >
                <Calendar />
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
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Dates />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="flex items-center justify-center " asChild>
            <div className="text-center">
              <Button
                variant="outline"
                className="w-full flex justify-items-center justify-center gap-1"
              >
                <User />
                {`${adults_number} ${
                  adults_number > 1 ? "travelers" : "traveler"
                }, ${room_number} room`}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Travelers />
          </PopoverContent>
        </Popover>
        <div className="text-center">
          <Button variant="blue" className="w-full text-xl ">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Header;
