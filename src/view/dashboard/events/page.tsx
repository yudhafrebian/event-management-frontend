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
import CardEvent from "@/components/card/cardEvent";
import Image from "next/image";
import CardLoader from "./Loading";
import CategoriesSelector from "@/components/filter/Categories";
import SearchBar from "./section/SearchBar";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import LocationSelector from "@/components/filter/Location";
import { useAppSelector } from "@/app/hook";
import CardEventOrganizer from "./section/CardEventOrganizer";
import Link from "next/link";

const DashboardEventView = () => {
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
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const user = useAppSelector((state) => {
    return state.authState;
  });
  console.log("user", user);
  const token = localStorage.getItem("tkn");
  const getEvents = async () => {
    try {
      setLoading(true);
      const search = searchParams.get("search");
      const category = searchParams.get("category");
      const location = searchParams.get("location");
      const response = await apiCall.get(`/dashboard/all`, {
        params: {
          search,
          category,
          location,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("event data", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printEvents = () => {
    return data.length > 0 ? (
      data.map((item: any) => (
        <CardEventOrganizer
          key={item.id}
          id={item.id}
          picture={item.event_picture}
          title={item.title}
          description={item.description}
          location={item.location}
          start_date={new Date(item.start_date)}
          price={item.ticket_types.map((item: any) => item.price)[0]}
        />
      ))
    ) : (
      <div className="font-bold text-2xl flex flex-col justify-center items-center mt-10">
        <Image
          src={"/assets/undraw_empty_4zx0.png"}
          alt="no data"
          width={300}
          height={300}
        />
        <h1>No events found</h1>
      </div>
    );
  };

  //temporary data
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
    getEvents();
  }, [searchParams.toString()]);

  return (
    <div className=" px-4 py-12 md:px-20 md:py-16">
      <div className="mt-4">
        <h1 className="font-bold text-3xl">All Event</h1>
      </div>
      <div className="flex flex-col gap-8 mt-5">
        <SearchBar />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
          <CategoriesSelector />
          <LocationSelector />

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
        <div>
          <Button>
            <Link href={"/dashboard/create-event"}>Create Event</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-10 gap-4">
        {loading ? <CardLoader /> : printEvents()}
      </div>
    </div>
  );
};

export default DashboardEventView;
