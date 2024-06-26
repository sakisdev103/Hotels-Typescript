//Redux
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

//Ui
import { Card, CardContent } from "@/components/ui/card";

const Hotels = () => {
  const { hotels } = useSelector((state: RootState) => state.hotels);
  return (
    <div className="container my-4">
      {hotels.map((item) => {
        const {
          hotel_id,
          hotel_name,
          max_photo_url,
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
              src={max_photo_url}
              alt="Hotel"
              className="w-full h-[270px] sm:w-[240px] sm:h-[240px] rounded-lg"
            />
            <CardContent className="w-full">
              <div className="flex justify-between gap-y-3">
                <h3 className="font-bold text-lg">{hotel_name}</h3>
                <div className="text-end">
                  <b>{review_score != null && `${review_score}/10`}</b>
                  <p>{review_score !== null && `${review_nr} reviews`}</p>
                </div>
              </div>
              <div className="flex justify-between ">
                <p className="w-2/4">
                  {(district as string).length! > 0
                    ? `${district}, ${default_wishlist_name}`
                    : default_wishlist_name}
                </p>
                <p>
                  {distance_to_cc_formatted === "0"
                    ? `${(distance_to_cc as string).slice(0, 3)} km from centre`
                    : distance_to_cc_formatted !== undefined &&
                      `${distance_to_cc_formatted} from centre`}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="w-2/4">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: unit_configuration_label,
                    }}
                  />
                  <p className="text-destructive font-semibold">
                    {urgency_message}
                  </p>
                </div>
                <div className="font-bold">
                  {
                    (composite_price_breakdown as any).all_inclusive_amount
                      .amount_rounded
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default Hotels;
