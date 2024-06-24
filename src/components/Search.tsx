import { useState, FormEvent } from "react";

//Files
import { getAllCities } from "@/state/hotel/hotelSlice";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchLocation } from "@/state/hotel/hotelSlice";
import { RootState } from "@/state/store";

//Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//UI
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const Search = () => {
  const { places } = useSelector((state: RootState) => state.location);
  console.log(places);
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  //Form
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
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(fetchLocation(values.location));
  }

  const fetchData = (value: string) => {
    setTimeout(() => {
      dispatch(getAllCities(value));
    }, 2000);
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    dispatch(fetchLocation(value));
  };

  return (
    <div className="items-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex ">
          <div className="w-screen">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-lg">
                    <Input
                      placeholder="Barcelona"
                      {...field}
                      value={input}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Command className="mt-1">
        <CommandList>
          {places.map((item: any, index: number) => {
            return (
              <CommandItem key={index}>
                <Button
                  variant="link"
                  onClick={(e) => handleSubmit(e, item.name)}
                >
                  {item.name}
                </Button>
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </div>
  );
};
export default Search;
