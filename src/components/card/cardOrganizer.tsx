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
interface ICardOrganizerProps {
  id: number;
  picture: string;
  name: string;
  description: string;
}

const CardOrganizer: React.FunctionComponent<ICardOrganizerProps> = (props) => {
  return (
    <Card key={props.id} className="pt-0 border-none shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-32 md:h-48">
          <Image
            src={
              props.picture ||
              "https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1743755151~exp=1743758751~hmac=940856a732090406bf748cabfd534378778d27005f63ead214f8d5d65c270d0b&w=1060"
            }
            alt={props.name}
            fill
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="font-bold text-lg md:text-xl">{props.name}</h2>
        <p className="text-muted-foreground text-xs md:text-base">{props.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          <Link href={`/organizers/${props.name}`}>
            <Button className="cursor-pointer">Visit Profile</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardOrganizer;
