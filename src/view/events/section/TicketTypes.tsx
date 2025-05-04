import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ITicketTypeContentProps {
  slug: string;
  type_name: string;
  price: number;
  quota: number;
  description: string;
}

const TicketTypeContent: React.FunctionComponent<ITicketTypeContentProps> = (
  props
) => {
  return (
    <CardContent>
      <div className="border-2 rounded-lg p-4">
        <div className="flex justify-between">
          <h4 className="font-bold text-lg">{props.type_name}</h4>
          <div className="flex items-center gap-2">
            <p
              className={`font-bold text-2xl text-primary ${
                props.quota === 0 ? "line-through" : ""
              }`}
            >
              {props.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-2xl text-destructive font-bold">
              {props.quota === 0 ? "Sold Out" : ""}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-2 mb-4">
            <p className="font-semibold">Ticket Description</p>
            <p className="text-[#4B5563] text-sm">{props.description}</p>
          </div>
          <p className="font-semibold text-right">Quota : {props.quota}</p>
        </div>
      </div>
    </CardContent>
  );
};

export default TicketTypeContent;
