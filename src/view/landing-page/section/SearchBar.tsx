"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { CalendarIcon, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const SearchBar = () => {
  const [date, setDate] = useState<Date>();
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
          />
        </div>
        <div className="relative">
          <MapPin
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input className="pl-8" type="search" placeholder="Location" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="justify-start text-left cursor-pointer text-black"
            >
              <CalendarIcon color="black" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="text-muted-foreground font-normal">
                  Pick A Date
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar  mode="single" selected={date} onSelect={setDate} initialFocus/>
          </PopoverContent>
        </Popover>
        <Button className="cursor-pointer">Search Events</Button>
      </div>
    </div>
  );
};

export default SearchBar;
