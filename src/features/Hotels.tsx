import { useState } from "react";

//File
import Alert from "@/components/Alert";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { AppDispatch } from "@/store";
import { getHotels, updateFilterOption } from "@/state/hotel/hotelSlice";

//UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";

const Hotels = () => {
  const { hotels, filters, filterOption } = useSelector(
    (state: RootState) => state.hotels
  );
  const { dest_id } = useSelector((state: RootState) => state.city);
  const date = useSelector((state: RootState) => state.dates);
  const { adults_number, room_number } = useSelector(
    (state: RootState) => state.travelers
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: string) => {
    if (date?.from !== undefined && date.to !== undefined) {
      const checkin_date = format(date.from, "yyyy-MM-dd");
      const checkout_date = format(date.to, "yyyy-MM-dd");
      dispatch(updateFilterOption(value));
      dispatch(
        getHotels({
          checkin_date,
          checkout_date,
          room_number,
          adults_number,
          dest_id,
          order_by: value,
        })
      );
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const modalFunc = (url: string) => {
    setShowModal(!showModal);
    setUrl(url);
  };

  return (
    <div className="container my-4">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={filters.map(({ id, name }) => {
              if (id === filterOption) {
                return `Sort by: ${name}`;
              }
            })}
          />
        </SelectTrigger>
        <SelectContent>
          {filters
            .filter(({ id }) => {
              return id !== "bayesian_review_score";
            })
            .map(({ id, name }) => {
              return (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      {hotels.map((item) => {
        const {
          hotel_id,
          hotel_name,
          max_1440_photo_url,
          review_score,
          review_nr,
          default_wishlist_name,
          district,
          distance_to_cc,
          distance_to_cc_formatted,
          unit_configuration_label,
          urgency_message,
          composite_price_breakdown,
          url,
        } = item;

        return (
          <Card className="w-full sm:flex my-3" key={hotel_id}>
            <img
              src={max_1440_photo_url}
              alt="Hotel"
              className="w-full h-[270px] sm:w-[240px] sm:h-[240px] rounded-lg"
            />
            <CardContent className="w-full">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg text-blue-600">
                  {hotel_name}
                </h3>
                <div className="text-end">
                  <b className="text-blue-600">
                    {review_score != null && `${review_score}/10`}
                  </b>
                  <p className="text-sm">
                    {review_score !== null && `${review_nr} reviews`}
                  </p>
                </div>
              </div>
              <div className="flex justify-between my-3 text-sm">
                <p className="text-blue-600 ">
                  {(district as string).length! > 0
                    ? `${district}, ${default_wishlist_name}`
                    : default_wishlist_name}
                </p>
                <p className="text-end">
                  {distance_to_cc_formatted === "0"
                    ? `${(distance_to_cc as string).slice(0, 3)} km from centre`
                    : distance_to_cc_formatted !== undefined &&
                      `${distance_to_cc_formatted} from centre`}
                </p>
              </div>
              <div className="flex justify-between my-3">
                <p
                  className="w-3/4"
                  dangerouslySetInnerHTML={{
                    __html: unit_configuration_label,
                  }}
                />
                <div className="font-bold text-end">
                  <p>
                    {
                      (composite_price_breakdown as any).all_inclusive_amount
                        .amount_rounded
                    }
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center my-3">
                <p className="text-destructive text-sm font-semibold">
                  {urgency_message}
                </p>

                <Button variant="blue" onClick={() => modalFunc(url)}>
                  Reserve
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Alert showModal={showModal} setShowModal={setShowModal} url={url} />
    </div>
  );
};
export default Hotels;
