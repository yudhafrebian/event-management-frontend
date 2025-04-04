import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import * as React from "react";
import { Badge } from "@/components/ui/badge";

const FeaturedEventSection = () => {
  const eventDummy = [
    {
      id: 1,
      picture:
        "https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1743755151~exp=1743758751~hmac=940856a732090406bf748cabfd534378778d27005f63ead214f8d5d65c270d0b&w=1060",
      title: "Summer Music Festival",
      description:
        "Join us for an unforgettable night of music and entertainment.",
      location: "New York",
      date: "2025-03-15",
      price: 600000,
    },
    {
        id: 2,
        picture:
          "https://plus.unsplash.com/premium_photo-1661277641736-92e575bd1d97?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "International Food Festival",
        description:
          "Taste culinary delights from around the world in one amazing food fest.",
        location: "Los Angeles",
        date: "2025-04-05",
        price: 75000,
      },
      {
        id: 3,
        picture:
          "https://img.freepik.com/free-photo/nyepi-day-celebration-indonesia_23-2151325635.jpg?t=st=1743755502~exp=1743759102~hmac=fd7a395edcdbcac264ae4914a4410f319fc819709ca09bba573b564c65ff4de4&w=1380",
        title: "Cultural & Traditional Festival",
        description:
          "Experience the richness of traditional dance, art, and heritage from across cultures.",
        location: "Bali",
        date: "2025-06-01",
        price: 0,
      }
  ];
  return (
    <div className="py-16 px-20">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Featured Events</h1>
        <Button variant={"link"} className="cursor-pointer">
          View All <ArrowRight />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {eventDummy.map((item) => (
          <Card key={item.id} className="pt-0 border-none shadow-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={item.picture}
                  alt={item.title}
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
                        <p className="text-sm text-muted-foreground/90">{format(item.date, "PPP")}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin size={14}/>
                        <p className="text-sm text-muted-foreground/90">{item.location}</p>
                    </div>
                </div>
                <h2 className="font-bold text-xl pt-2">{item.title}</h2>
                <p className="text-muted-foreground pt-3">{item.description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between w-full">
                    <Badge variant={"outline"}>{item.price !== 0 ? item.price.toLocaleString("id-ID",{
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits:0
                    }) : "Free"}</Badge>
                    <Button className="cursor-pointer">Book Now</Button>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventSection;
