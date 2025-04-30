"use client";
import CardTransactionEvent from "@/components/card/cardEventTransaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/utils/apiHelper";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface ITicketDetailProps {
  params: { slug: string; slug2: string };
}

interface IDetail {
  type_name: string;
  price: number;
  quota: number;
  description: string;
  event_id: number;
  events: {
    id: number;
    title: string;
    description: string;
    event_picture: string;
    location: string;
    start_date: Date;
    end_date: Date;
  };
}

const TicketDetail: React.FunctionComponent<ITicketDetailProps> = (props) => {
  const [detail, setDetail] = React.useState<IDetail | null>(null);
  const [amount, setAmount] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const getTicketDetail = async () => {
    try {
      const { slug, slug2 } = await props.params;
      const response = await apiCall.get(
        `/events/${slug}/transaction/${slug2}`
      );
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTicketAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) value = 0;
    setAmount(value);
    setPrice(value * (detail?.price || 0));
  };

  React.useEffect(() => {
    getTicketDetail();
  }, []);

  React.useEffect(() => {
    setPrice(amount * (detail?.price || 0));
  }, [amount, detail]);
  return (
    <div className="p-20 bg-[#F9FAFB]">
      <div className="p-6 bg-white rounded-xl">
        <h1>Ticket Summary</h1>
        <div className="flex gap-6">
          <CardTransactionEvent
            title={detail?.events.title || ""}
            event_picture={detail?.events.event_picture || ""}
            start_date={detail?.events.start_date || new Date()}
            end_date={detail?.events.end_date || new Date()}
            location={detail?.events.location || ""}
          />
          <div className="w-1/3 bg-[#F9FAFB] rounded-lg p-6">
            <div className="flex justify-between">
              <p className="text-[#4B5563]">{detail?.type_name}</p>
              <p className="font-bold">
                {detail?.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setAmount((prev) => Math.max(prev - 1, 0))}
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  -
                </Button>
                <Input
                  className="w-1/5 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={amount}
                  type="number"
                  onChange={handleTicketAmount}
                />
                <Button
                  type="button"
                  onClick={() => setAmount((prev) => prev + 1)}
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  +
                </Button>
              </div>

              <p className="font-bold">
                {price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
