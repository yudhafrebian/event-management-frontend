import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { format } from "date-fns";

interface ICardTransactionEventProps {
  event_picture: string;
  title: string;
  location: string;
  start_date: Date;
  end_date: Date;
}

const CardTransactionEvent: React.FunctionComponent<
  ICardTransactionEventProps
> = (props) => {
  return (
    <Card className="w-2/3 pt-0 shadow-none">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={
              props.event_picture ||
              "https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1743755151~exp=1743758751~hmac=940856a732090406bf748cabfd534378778d27005f63ead214f8d5d65c270d0b&w=1060"
            }
            alt={props.title || "Event Picture"}
            fill
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="font-bold text-xl mb-3">{props.title}</h2>
        <div className="flex items-center gap-2">
          <CalendarIcon size={14} />
          {props.start_date === props.end_date ? (
            <p className="text-[#4B5563]">
              {props.start_date
                ? format(props.start_date, "PPP")
                : "Date not available"}
            </p>
          ) : (
            <p className="text-[#4B5563]">
              {props.start_date
                ? format(props.start_date, "PPP")
                : "Date not available"}{" "}
              -{" "}
              {props.end_date
                ? format(props.end_date, "PPP")
                : "Date not available"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <p className="text-[#4B5563]">{props.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTransactionEvent;
