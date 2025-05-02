import { format } from "date-fns";
import Image from "next/image";
import * as React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

interface ICardTransactionListProps {
  event_image: string;
  invoice_id: string;
  event_name: string;
  transaction_date: Date;
  total_price: number;
  status: string;
}

const CardTransactionList: React.FunctionComponent<
  ICardTransactionListProps
> = (props) => {
  return (
    <div className="flex justify-between p-4 border-2 rounded-lg">
      <div className="flex w-1/2 gap-8">
        <div className="relative h-28 w-1/3">
          <Image
            src={props.event_image}
            alt={props.event_name}
            fill
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg text-primary">{props.invoice_id}</p>
          <p>{props.event_name}</p>
          <p className="text-sm mt-4 text-[#4B5563]">
            Transaction Date: {format(props.transaction_date, "Pp")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-2xl">
          {props.total_price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
        <Badge
          variant={"outline"}
          className={`${
            props.status === "Pending"
              ? "text-orange-500 border-orange-500"
              : props.status === "Rejected" ||
                props.status === "Canceled" ||
                props.status === "Expired"
              ? "text-red-500 border-red-500"
              : props.status === "Confirmating"
              ? "text-primary border-primary"
              : "text-green-500 border-green-500"
          } text-sm`}
        >
          {props.status}
        </Badge>
        <Link href={`/profile/transactions/${props.invoice_id}`}>
        <Button className="cursor-pointer">Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardTransactionList;
