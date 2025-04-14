import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface ITicketTypeContentProps {
  type_name: string;
  price: number;
  quota: number;
  description:string;
}

const TicketTypeContent: React.FunctionComponent<ITicketTypeContentProps> = (
  props
) => {
  return (
    <CardContent>
      <div className="border-2 rounded-lg p-4">
        <div className="flex justify-between">
          <h4 className="font-bold text-lg">{props.type_name}</h4>
          <p className="font-bold text-2xl text-primary">
            {props.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div className="text-[#4B5563] mt-2 mb-4">
            <p>{props.description}</p>
        </div>
        <div className="flex justify-between">
          <Button className="cursor-pointer">Buy</Button>
          <p className="font-semibold">Quota : {props.quota}</p>
        </div>
      </div>
    </CardContent>
  );
};

export default TicketTypeContent;
