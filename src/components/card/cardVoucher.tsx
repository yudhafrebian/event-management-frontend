import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { BadgeCheck } from "lucide-react";

interface ICardVoucherProps {
  code: string;
  discount: number;
  start_date: Date;
  end_date: Date;
  quota: number;
}

const CardVoucher: React.FunctionComponent<ICardVoucherProps> = (props) => {
  return (
    <Card className="w-2/3 py-2 bg-primary/10">
      <CardContent>
        <div className="flex justify-between">
          <h4 className="font-bold ">{props.code}</h4>
          <p className="flex items-center gap-1 text-green-600"><BadgeCheck /> Applied</p>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-sm font-semibold">
          <p>
            Discount:{" "}
            {props.discount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </p>
          <p>Quota: {props.quota}</p>
        </div>
        <p className="text-[#4B5563] text-sm mt-2">
          Valid until: {format(props.end_date, "PPP")}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardVoucher;
