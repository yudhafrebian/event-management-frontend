"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import CardEvent from "@/components/card/cardEvent";
import Link from "next/link";
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import CardLoader from "../Loading";

const FeaturedEventSection = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const getEvents = async () => {
    try {
      setLoading(true);
      const search = searchParams.get("search");
      const location = searchParams.get("location");
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const response = await apiCall.get("/events/all", {
        params: {
          search,
          location,
          from,
          to,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printCardList = () => {
    return data.length > 0 ? (
      data.map((item) => {
        return (
          <CardEvent
            key={item.id}
            id={item.id}
            picture={item.event_picture}
            title={item.title}
            description={item.description}
            location={item.location}
            start_date={new Date(item.start_date)}
            price={
              item.ticket_types
                .map((item: any) => item.price)
                .sort((a: number, b: number) => a - b)[0]
            }
          />
        );
      })
    ) : (
      <div className="font-bold text-xl md:text-2xl flex flex-col justify-center items-center mt-10">
        <Image
          src={"/assets/undraw_empty_4zx0.png"}
          alt="no data"
          width={300}
          height={300}
        />
        <h1>No events found</h1>
      </div>
    );
  };

  useEffect(() => {
    getEvents();
  }, [searchParams]);
  return (
    <div className="px-4 py-8 md:py-16 md:px-20" id="events">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl md:text-3xl">Featured Events</h1>
        <Link href={"/events"}>
          <Button variant={"link"} className="cursor-pointer">
            View All <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
        {loading ? (
          <CardLoader />
        ) : (
          printCardList()
        )}
      </div>
    </div>
  );
};

export default FeaturedEventSection;
