"use client";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { CalendarIcon, MapPin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>(
    searchParams.get("date")
      ? {
          from: new Date(searchParams.get("date") as string),
          to: addDays(new Date(searchParams.get("date") as string), 1),
        }
      : undefined
  );

  const [keyword, setKeyword] = useState<string>(
    searchParams.get("search") || ""
  );
  const [location, setLocation] = useState<string>(
    searchParams.get("location") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    if (date?.from) {
      params.set("from", date.from.toISOString());
    } else {
      params.delete("from");
    }

    if (date?.to) {
      params.set("to", date.to.toISOString());
    } else {
      params.delete("to");
    }

    console.log(params.toString());

    router.push(`/?${params.toString()}#events`);
  };
  return (
    <div className="w-[90%] mx-auto relative z-0 bottom-10 bg-white rounded-2xl shadow-xl">
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <IoSearch
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            className="pl-8"
            type="search"
            placeholder="Search events..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
        <div className="relative">
          <MapPin
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            className="pl-8"
            type="search"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="justify-start text-left cursor-pointer text-black"
            >
              <CalendarIcon color="black" />
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
          <PopoverContent className="w-auto p-0">
            <Calendar
              numberOfMonths={2}
              mode="range"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button type="button" onClick={handleSearch} className="cursor-pointer">
          Search Events
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
