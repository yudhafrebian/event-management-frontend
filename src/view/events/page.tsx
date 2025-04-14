"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiCall } from "@/utils/apiHelper";
import CardEvent from "@/components/event/cardEvent";

const EventView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [openPrice, setOpenPrice] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [valueLocation, setValueLocation] = useState<string>("");
  const [valueSort, setValueSort] = useState<string>("");
  const [PriceMin, setPriceMin] = useState<number>(0);
  const [PriceMax, setPriceMax] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [data, setData] = useState<any>([]);

  const getEvents = async () => {
    try {
      const response = await apiCall.get("/events/all");
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const printEvents = () => {
    return data.length > 0 ? (
      data.map((item: any) => (
        <CardEvent
          key={item.id}
          id={item.id}
          picture={item.event_picture}
          title={item.title}
          description={item.description}
          location={item.location}
          start_date= {new Date(item.start_date)}
          price={item.ticket_types.map((item: any) => item.price)[0]}
        />
      ))
    ) : (
      <div className="font-bold text-2xl text-center">
        <h1>No events found</h1>
      </div>
    );
  }

  //temporary data
  const categories = [
    {
      label: "Music",
      value: "music",
    },
    {
      label: "Tecnology",
      value: "tecnology",
    },
    {
      label: "Culinary",
      value: "culinary",
    },
    {
      label: "Arts",
      value: "arts",
    },
    {
      label: "Sports",
      value: "sports",
    },
    {
      label: "Education",
      value: "education",
    },
  ];

  const location = [
    {
      label: "New York",
      value: "new_york",
    },
    {
      label: "Los Angeles",
      value: "los_angeles",
    },
    {
      label: "Bali",
      value: "bali",
    },
  ];

  const sort = [
    {
      label: "Newest",
      value: "newest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
    {
      label: "Lowest Price",
      value: "lowest_price",
    },
    {
      label: "Highest Price",
      value: "highest_price",
    },
  ];

  useEffect(() => {
    getEvents()
  },[])

  return (
    <div className="px-20 py-16">
      <div className="mt-4">
        <h1 className="font-bold text-3xl">All Event</h1>
      </div>
      <div className="flex flex-col gap-8 mt-5">
        <div className="relative">
          <IoSearch
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            className="pl-8"
            type="search"
            placeholder="Search events..."
          />
        </div>
        <div className="grid grid-cols-5 gap-6">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline2"}
                role="combobox"
                aria-expanded={open}
                className="justify-between cursor-pointer"
              >
                {value
                  ? categories.find((category) => category.value === value)
                      ?.label
                  : "Categories"}
                <ChevronsUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {category.label}
                        <Check
                          className={
                            value === category.value
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openLocation} onOpenChange={setOpenLocation}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline2"}
                role="combobox"
                aria-expanded={openLocation}
                className="justify-between cursor-pointer"
              >
                {valueLocation
                  ? location.find((loc) => loc.value === valueLocation)?.label
                  : "Location"}
                <ChevronsUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search location..." />
                  <CommandGroup>
                    {location.map((loc) => (
                      <CommandItem
                        key={loc.value}
                        value={loc.value}
                        onSelect={(currentValue) => {
                          setValueLocation(
                            currentValue === valueLocation ? "" : currentValue
                          );
                          setOpenLocation(false);
                        }}
                      >
                        {loc.label}
                        <Check
                          className={
                            valueLocation === loc.value
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openPrice} onOpenChange={setOpenPrice}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline2"}
                role="combobox"
                aria-expanded={openPrice}
                className="justify-between cursor-pointer"
              >
                {`${PriceMin.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })} - ${PriceMax.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}`}
                <ChevronsUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Label htmlFor="min" className="text-xs">
                    Min. Price
                  </Label>
                  <Input
                    id="min"
                    type="number"
                    className="w-2/3"
                    placeholder="minimum price"
                    defaultValue={PriceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                  />
                </div>
                <div className="flex gap-2 ">
                  <Label htmlFor="min" className="text-xs">
                    Max. Price
                  </Label>
                  <Input
                    id="min"
                    type="number"
                    className="w-2/3"
                    placeholder="minimum price"
                    defaultValue={PriceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start text-left cursor-pointer text-black"
              >
                {date ? format(date, "PPP") : "Date Range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={openSort} onOpenChange={setOpenSort}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline2"}
                role="combobox"
                aria-expanded={open}
                className="justify-between cursor-pointer"
              >
                {`Sort By : ${
                  valueSort
                    ? sort.find((sort) => sort.value === valueSort)?.label
                    : ""
                }`}
                <ChevronsUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {sort.map((sort) => (
                      <CommandItem
                        key={sort.value}
                        value={sort.value}
                        onSelect={(currentValue) => {
                          setValueSort(
                            currentValue === valueSort ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        {sort.label}
                        <Check
                          className={
                            valueSort === sort.value
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-10">
        {printEvents()}
      </div>
    </div>
  );
};

export default EventView;
