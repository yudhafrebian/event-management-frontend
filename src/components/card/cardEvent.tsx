import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
interface ICardEventProps {
  id: number;
  picture: string;
  title: string;
  description: string;
  location: string;
  start_date: Date;
  price: number;
}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  return (
    <Card key={props.id} className="pt-0 border-none shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-32 md:h-48">
          <Image
            src={
              props.picture ||
              "https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1743755151~exp=1743758751~hmac=940856a732090406bf748cabfd534378778d27005f63ead214f8d5d65c270d0b&w=1060"
            }
            alt={props.title}
            fill
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <CalendarIcon size={14} />
            <p className="text-sm text-muted-foreground/90">
              {format(props.start_date, "PPP")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={14} />
            <p className="text-sm text-muted-foreground/90">{props.location}</p>
          </div>
        </div>
        <h2 className="font-bold text-lg md:text-xl pt-2">{props.title}</h2>
        <p className="text-muted-foreground text-xs md:text-base pt-3">{props.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-end md:justify-between w-full">
          <Badge variant={"outline"}>
            {props.price !== 0
              ? `Starts at ${props.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}`
              : "Free"}
          </Badge>

          <Link href={`/events/${props.title}`}>
            <Button className="cursor-pointer">Book Now</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardEvent;
