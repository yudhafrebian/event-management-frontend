"use client";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";

const EventView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

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
        <div className="grid grid-cols-5">
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
        </div>
      </div>
    </div>
  );
};

export default EventView;
