import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
interface ICardEventProps {
    id: number;
    picture: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    price: number;
}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  return (
    <Card key={props.id} className="pt-0 border-none shadow-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={props.picture}
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
                        <CalendarIcon size={14}/>
                        <p className="text-sm text-muted-foreground/90">{format(props.date, "PPP")}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin size={14}/>
                        <p className="text-sm text-muted-foreground/90">{props.location}</p>
                    </div>
                </div>
                <h2 className="font-bold text-xl pt-2">{props.title}</h2>
                <p className="text-muted-foreground pt-3">{props.description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between w-full">
                    <Badge variant={"outline"}>{props.price !== 0 ? props.price.toLocaleString("id-ID",{
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits:0
                    }) : "Free"}</Badge>
                    <Button className="cursor-pointer">Book Now</Button>
                </div>
            </CardFooter>
          </Card>
  )
};

export default CardEvent;
