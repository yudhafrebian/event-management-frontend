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
import { useState, useMemo, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiCall } from "@/utils/apiHelper";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardVoucher from "@/components/card/cardVoucher";
import { set } from "lodash";
import { useAppSelector } from "@/app/hook";

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

interface iVoucher {
  code: string;
  disc_amount: number;
  start_date: Date;
  end_date: Date;
  quota: number;
}

const CheckoutSection: React.FunctionComponent<ICheckoutSectionProps> = (
  props
) => {
  const router = useRouter();
  const [amounts, setAmounts] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherData, setVoucherData] = useState<iVoucher | null>(null);
  const [usePoints, setUsePoints] = useState<boolean>(false);

  const user = useAppSelector((state) => state.authState);

  const getVoucher = async () => {
    try {
      const response = await apiCall.get(
        `/vouchers/${props.event_id}/${voucherCode}`
      );

      setVoucherData(response.data);
    } catch (error: any) {
      setVoucherData(null);
      const message = error?.response?.data?.message ?? "Invalid voucher code";
      toast.error(message);
      console.log(error);
    }
  };

  const getPoints = async () => {
    try {
      const token = localStorage.getItem("tkn");
      const response = await apiCall.get("/transactions/points", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPoints(response.data.total_point);
    } catch (error) {
      console.log(error);
    }
  };

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

  const afterDiscount = useMemo(() => {
    let dicounted = totalPrice;
    if (voucherData) {
      dicounted -= voucherData.disc_amount;
    }
    if (usePoints) {
      dicounted -= points;
    }

    return Math.max(0, dicounted);
  }, [totalPrice, points, usePoints, voucherData]);

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

      const response = await apiCall.post(
        "/transactions/create",
        {
          event_id: props.event_id,
          tickets: ticketToBuy,
          sub_total: totalPrice,
          point_discount: usePoints ? points : 0,
          voucher_discount: voucherData ? voucherData.disc_amount : 0,
          total_price: afterDiscount,
          usePoints,
          voucherCode,
          status: afterDiscount === 0 ? "Approved" : "Pending",
          useVoucher: voucherData ? true : false,
          voucher_code: voucherData?.code ?? null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Transaction created successfully");
      router.push("/profile/transactions");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPoints();
    getVoucher();
  }, []);

  useEffect(() => {
    if (props.ticket_types.length > 0) {
      setAmounts(props.ticket_types.map(() => 0));
    }
  }, [props.ticket_types]);

  return (
    <>
      {!user.email ? (
        <Button
          className="cursor-pointer"
          onClick={() => toast.error("Please login first")}
        >
          Buy Ticket <ShoppingCart className="ml-2" />
        </Button>
      ) : !user.is_verified ? (
        <Button
          className="cursor-pointer"
          onClick={() =>
            toast.error("Please verify your email first", {
              description: "Verify your email so you can buy tickets",
            })
          }
        >
          Buy Ticket <ShoppingCart className="ml-2" />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              Buy Ticket <ShoppingCart className="ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[58em]">
            <ScrollArea className="h-[30em] overflow-hidden">
              <div className="flex flex-col md:flex-row md:w-[55em] gap-6 overflow-auto">
                <div className="md:w-1/2 flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {props.event_name}
                    </DialogTitle>
                  </DialogHeader>
                  <div>
                    <div>
                      <h2 className="text-lg font-semibold my-2">Voucher</h2>
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Enter voucher code"
                          value={voucherCode}
                          onChange={(e) =>
                            setVoucherCode(e.target.value.toUpperCase())
                          }
                        />
                        <Button
                          type="button"
                          className="cursor-pointer"
                          onClick={getVoucher}
                        >
                          Apply
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        {voucherData && (
                          <CardVoucher
                            code={voucherData.code}
                            discount={voucherData.disc_amount}
                            end_date={voucherData.end_date}
                            start_date={voucherData.start_date}
                            quota={voucherData.quota}
                          />
                        )}
                        {voucherData && (
                          <Button
                            type="button"
                            className="cursor-pointer"
                            variant={"destructive"}
                            onClick={() => setVoucherData(null)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold my-2">Tickets</h2>
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
                              handleTicketAmount(
                                index,
                                parseInt(e.target.value) || 0
                              )
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

                <div className="bg-[#F5F3FF] md:w-1/2 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h2>
                    {checkoutPayload.map((item) => (
                      <div
                        key={item.type_name}
                        className="flex justify-between mb-2"
                      >
                        <p>
                          {item.type_name} x {item.quantity}
                        </p>
                        <p>
                          {(item.price * item.quantity).toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t pt-4 flex justify-between">
                    <p>Your Points:</p>
                    <p>
                      {points.toLocaleString("id-ID", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p>Use Points</p>
                    <Switch
                      className="cursor-pointer"
                      disabled={totalPrice === 0}
                      checked={usePoints}
                      onCheckedChange={setUsePoints}
                    />
                  </div>

                  <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
                    <p>Sub Total:</p>
                    <p>
                      {totalPrice.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  {usePoints && (
                    <div className="flex justify-between text-sm text-[#4B5563]">
                      <p>Point Discounts</p>
                      <p>
                        -{" "}
                        {points.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  )}
                  {voucherData && (
                    <div className="flex justify-between text-sm text-[#4B5563]">
                      <p>Voucher Discounts</p>
                      <p>
                        -{" "}
                        {voucherData.disc_amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 border-t pt-4 flex justify-between">
                    <p className="font-bold text-lg">Total:</p>
                    <p className="font-bold text-lg">
                      {afterDiscount.toLocaleString("id-ID", {
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
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CheckoutSection;
