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
  const user = useAppSelector((state) => state.authState);
  const router = useRouter()

  const handleBuy = () => {
    toast.info("Please Login", {
      description: "You need to login to buy ticket",
      action:{
        label: "Login",
        onClick: () => router.push("/sign-in")
      }
    });
  };
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
          <p className="font-semibold">Quota : {props.quota}</p>
          {user.email ? (
            <Link href={`/events/${props.slug}/transaction/${props.type_name}`}>
              <Button className="cursor-pointer">Buy</Button>
            </Link>
          ) : (
            <Button onClick={handleBuy} className="cursor-pointer">
              Buy
            </Button>
          )}
        </div>
      </div>
    </CardContent>
  );
};

export default TicketTypeContent;
