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

interface ICategoriesSelectorProps {
  name: string; 
  placeholder?: string;
}

const CategoriesSelector: React.FunctionComponent<ICategoriesSelectorProps> = ({
  name,
  placeholder,
}) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const response = await apiCall.get("/events/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    getCategories();
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
            ? categories.find((category) => category === field.value)
            : placeholder || "Select Category"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => {
                    helpers.setValue(category);
                    setOpen(false);
                  }}
                >
                  {category}
                  <Check
                    className={
                      field.value === category ? "opacity-100 ml-auto" : "opacity-0 ml-auto"
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
