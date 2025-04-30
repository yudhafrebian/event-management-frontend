"use client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { apiCall } from "@/utils/apiHelper";

interface ICheckoutSectionProps {
  event_id: number;
  event_name: string;
  start_date: Date;
  end_date: Date;
  location: string;
  event_picture: string;
  ticket_types: {
    id: number;
    type_name: string;
    price: number;
    quota: number;
    description: string;
  }[];
}

const CheckoutSection: React.FunctionComponent<ICheckoutSectionProps> = (
  props
) => {
  const [amounts, setAmounts] = useState<number[]>([]);

  const handleTicketAmount = (index: number, value: number) => {
    setAmounts((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, value);
      return updated;
    });
  };

  const incrementAmount = (index: number) => {
    setAmounts((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  const decrementAmount = (index: number) => {
    setAmounts((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, updated[index] - 1);
      return updated;
    });
  };

  const totalPrice = useMemo(() => {
    return props.ticket_types.reduce((total, ticket, index) => {
      return total + ticket.price * (amounts[index] || 0);
    }, 0);
  }, [amounts, props.ticket_types]);

  const checkoutPayload = useMemo(() => {
    return props.ticket_types
      .map((ticket, index) => ({
        id: ticket.id,
        type_name: ticket.type_name,
        price: ticket.price,
        quantity: amounts[index],
      }))
      .filter((item) => item.quantity > 0);
  }, [amounts, props.ticket_types]);

  console.log("Checkout Payload: ", checkoutPayload);

  const handleCheckout = async () => {
    try {
      if (checkoutPayload.length === 0) {
        toast.error("Please select at least one ticket");
        return;
      }
      const ticketToBuy = checkoutPayload.flatMap((item) =>
        Array.from({ length: item.quantity }, () => {
          return {
            id: item.id,
            type_name: item.type_name,
            price: item.price,
          };
        })
      );

      const token = localStorage.getItem("tkn");

      const response = await apiCall.post("/transactions/create", {
          event_id: props.event_id,
          tickets: ticketToBuy,
          total_price: totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })


      toast.success("Transaction created successfully");
      console.log("Transaction Success: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    if (props.ticket_types.length > 0) {
      setAmounts(props.ticket_types.map(() => 0));
    }
  }, [props.ticket_types]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          Buy Ticket <ShoppingCart className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[58em]">
        <div className="flex w-[55em] gap-6">
          <div className="w-1/2 flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {props.event_name}
              </DialogTitle>
              {/* <DialogDescription>
                <p>
                  {props.start_date === props.end_date
                    ? format(props.start_date, "PPP")
                    : `${format(props.start_date, "PPP")} - ${format(
                        props.end_date,
                        "PPP"
                      )}`}
                </p>
              </DialogDescription> */}
            </DialogHeader>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Tickets</h2>

              {props.ticket_types.map((ticket, index) => (
                <div
                  key={ticket.type_name}
                  className="flex flex-col gap-2 border-2 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{ticket.type_name}</p>
                    <p>
                      {ticket.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size={"sm"}
                      onClick={() => decrementAmount(index)}
                      type="button"
                      className="cursor-pointer"
                    >
                      <Minus />
                    </Button>
                    <Input
                      type="number"
                      value={amounts[index] ?? 0}
                      onChange={(e) =>
                        handleTicketAmount(index, parseInt(e.target.value) || 0)
                      }
                      min={0}
                      max={ticket.quota}
                      className="w-1/5 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      size={"sm"}
                      onClick={() => incrementAmount(index)}
                      type="button"
                      className="cursor-pointer"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F5F3FF] w-1/2 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              {checkoutPayload.map((item) => (
                <div key={item.type_name} className="flex justify-between mb-2">
                  <p>
                    {item.type_name} x {item.quantity}
                  </p>
                  <p>
                    {(item.price * item.quantity).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
              <p>Total:</p>
              <p>
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <Button
              type="button"
              className="w-full mt-6 cursor-pointer"
              disabled={checkoutPayload.length === 0}
              onClick={handleCheckout}
            >
              Confirm & Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutSection;
