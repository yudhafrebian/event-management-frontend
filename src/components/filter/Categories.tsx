"use client";
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


interface ICategoriesSelectorProps {}

const CategoriesSelector: React.FunctionComponent<ICategoriesSelectorProps> = (
  props
) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const response = await apiCall.get("/events/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategories();
  },[])
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
            ? categories.find((category) => category === value)
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
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category}
                  <Check
                    className={
                      value === category? "opacity-100" : "opacity-0"
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

export default CategoriesSelector;
