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

const Header = () => {
  const { selectedCity } = useSelector((state: RootState) => state.city);
  return (
    <div className="container my-4">
      <h1 className="text-4xl font-semibold">Where to?</h1>
      <div className="grid md:grid-cols-3 gap-3 my-5">
        <Popover>
          <PopoverTrigger
            className="flex items-center justify-center gap-1"
            asChild
          >
            <Button variant="default">
              <MapPin />
              {selectedCity ? selectedCity : "Where are you going?"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Place />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger
            className="flex items-center justify-center gap-1"
            asChild
          >
            <Button variant="default">
              <Calendar />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Dates />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger
            className="flex items-center justify-center gap-1"
            asChild
          >
            <Button variant="default">
              <User />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Travelers />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default Header;
