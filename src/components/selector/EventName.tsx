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

interface IEventNameSelectorProps {
  name: string;
  placeholder?: string;
}

const EventNameSelector: React.FunctionComponent<IEventNameSelectorProps> = ({
  name,
  placeholder,
}) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);

  const getEventName = async () => {
    try {
      const res = await apiCall.get("/vouchers/event", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventName();
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
            ? data.find((item) => item.title === field.value)?.title
            : placeholder || "Select Event"}

          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Events..." />
          <CommandList>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => {
                    helpers.setValue(item.title);
                    setOpen(false);
                  }}
                >
                  {item.title}
                  <Check
                    className={
                      field.value === item.title
                        ? "opacity-100 ml-auto"
                        : "opacity-0 ml-auto"
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

export default EventNameSelector;
