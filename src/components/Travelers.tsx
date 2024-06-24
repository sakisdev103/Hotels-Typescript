//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/state/store";

//Ui
import { Button } from "./ui/button";
import { Input } from "./ui/input";

//Icons
import { CircleMinus, CirclePlus } from "lucide-react";
import { increase, decrease } from "@/state/travelers/travelerSlice";

const Travelers = () => {
  const { adults_number, room_number } = useSelector(
    (state: RootState) => state.travelers
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <p>{`Room ${room_number}`}</p>
      <div className="flex items-center gap-5">
        <h5>Adults</h5>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(decrease())}
        >
          <CircleMinus />
        </Button>
        <Input
          type="number"
          name="adults_number"
          onKeyDown={(e) => e.preventDefault()}
          value={adults_number}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(increase())}
        >
          <CirclePlus />
        </Button>
      </div>
    </div>
  );
};
export default Travelers;
