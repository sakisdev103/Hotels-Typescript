//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/state/store";

//React-form / zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//File
import { getAllCities } from "@/state/cities/citiesSlice";
import { getCity } from "@/state/city/citySlice";

//UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Place = () => {
  const { allCities } = useSelector((state: RootState) => state.cities);
  const { selectedCity } = useSelector((state: RootState) => state.city);

  const dispatch = useDispatch<AppDispatch>();

  const formSchema = z.object({
    location: z
      .string()
      .min(1, {
        message: "Please provide a location",
      })
      .max(50, {
        message: "Location name is too long",
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: selectedCity,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    dispatch(getAllCities(e.target.value));
  };

  return (
    <div>
      <Form {...form}>
        <form onChange={handleChange}>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl className="text-lg">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col gap-3 mt-3">
        {allCities?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Button
                variant="link"
                onClick={() => dispatch(getCity(item.name))}
              >{`${item.name}, ${item.country}`}</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Place;
