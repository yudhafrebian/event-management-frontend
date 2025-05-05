"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface IPaymentStatusFilterProps {
    value: string
    onValueChange: (value: string) => void
}

const PaymentStatusFilter: React.FunctionComponent<
  IPaymentStatusFilterProps
> = ({value, onValueChange}) => {
  const [status, setStatus] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const getStatusList = async () => {
    try {
      const res = await apiCall.get("/transactions/status");
      setStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusList();
  },[])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer">
          {value ? status.find((item) => item === value) : "Payment Status"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {status.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                  <Check
                    className={value === item ? "opacity-100" : "opacity-0"}
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

export default PaymentStatusFilter;
