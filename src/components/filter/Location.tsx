import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import { useRouter, useSearchParams } from "next/navigation";

interface ILocationSelectorProps {}

const LocationSelector: React.FunctionComponent<ILocationSelectorProps> = (
  props
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    searchParams.get("location") || ""
  );
  const [location, setLocation] = useState<{ city: string; country: string }[]>(
    []
  );

  const getLocation = async () => {
    try {
      const response = await apiCall.get("/events/locations");
      setLocation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (location === value) {
      params.delete("location");
      setValue("");
    } else {
      params.set("location", location);
      setValue(location);
    }
    router.push(`/events?${params.toString()}`);
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline2"}
          role="combobox"
          aria-expanded={open}
          className="justify-between cursor-pointer"
        >
          {value
            ? location.find((loc) => loc.city === value)?.city
            : "Location"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search location..." />
            <CommandGroup>
              <CommandItem
                className="my-1"
                onSelect={(currentValue) => {
                  handleLocationChange("");
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {value}
              </CommandItem>
              {location.map((loc) => (
                <CommandItem
                  id={loc.city}
                  key={loc.city}
                  value={loc.city}
                  onSelect={(currentValue) => {
                    handleLocationChange(loc.city);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {loc.city}
                  <Check
                    className={value === loc.city ? "opacity-100" : "opacity-0"}
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
