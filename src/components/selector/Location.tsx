"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";

interface ILocationSelectorProps {
  name: string;
  placeholder?: string;
}

const LocationSelector: React.FunctionComponent<ILocationSelectorProps> = ({
  name,
  placeholder,
}) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<{ city: string; country: string }[]>([]);

  const getLocations = async () => {
    try {
      const response = await apiCall.get("/events/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline2"}
          role="combobox"
          className="justify-between cursor-pointer w-full"
        >
          {field.value
            ? locations.find((loc) => loc.city === field.value)?.city
            : placeholder || "Select Location"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandGroup>
              {locations.map((loc) => (
                <CommandItem
                  key={loc.city}
                  value={loc.city}
                  onSelect={() => {
                    helpers.setValue(loc.city); 
                    setOpen(false);
                  }}
                >
                  {loc.city}
                  <Check
                    className={
                      field.value === loc.city ? "opacity-100 ml-auto" : "opacity-0 ml-auto"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
