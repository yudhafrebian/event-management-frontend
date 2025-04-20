"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { apiCall } from "@/utils/apiHelper";
import AboutSection from "@/view/events/section/About";
import HeroSection from "@/view/events/section/Hero";
import OrganizerSection from "@/view/events/section/Organizer";
import TicketTypesSection from "@/view/events/section/TicketTypes";
import { useEffect, useState } from "react";

interface IDetailEventProps {
  params: Promise<{ slug: string }>;
}

interface IDetail {
  detail: {
    id: string;
    organizer_id: string;
    event_picture: string;
    title: string;
    description: string;
    about: string;
    location: string;
    start_date: Date;
    end_date: Date;
    available_seats: number;
    is_free: boolean;
    category: string;
    organizer: {
      id: any;
      organizer_name: string;
      profile_img: string;
      description: string;
    };
    ticket_types: {
      id: number;
      type_name: string;
      price: number;
      quota: number;
      description:string
    }[];
  };
  price: any;
  quota: number;
}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  const [event, setEvent] = useState<IDetail | null>(null);
  const getEventDetail = async () => {
    try {
      const eventId = await props.params;
      const response = await apiCall.get(`/events/${eventId.slug}`);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPrice = () => {
    const prices = event?.price;
    if (!prices || !Array.isArray(prices) || prices.length === 0) return "Free";

    if (prices.length === 1) {
      return `Rp${prices[0].toLocaleString("id-ID")}`;
    }

    const min = prices[0];
    console.log(prices);
    const max = prices[prices.length - 1];
    return `Rp${min.toLocaleString("id-ID")} - Rp${max.toLocaleString(
      "id-ID"
    )}`;
  };

  useEffect(() => {
    getEventDetail();
  }, []);
  return (
    <main>
      <HeroSection
        background_image={event?.detail.event_picture || ""}
        title={event?.detail.title || ""}
        start_date={event?.detail.start_date || new Date()}
        end_date={event?.detail.end_date || new Date()}
        location={event?.detail.location || ""}
      />
      <div className="flex px-24 py-8 gap-8">
        <div className="flex flex-col w-2/3 gap-8">
          <AboutSection
            about={event?.detail.about || ""}
            seats={event?.quota || 0}
            price={renderPrice()}
          />
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Ticket Types</CardTitle>
            </CardHeader>
            {event?.detail.ticket_types?.map((ticket) => (
              <TicketTypesSection
                key={ticket.id}
                type_name={ticket.type_name}
                price={ticket.price}
                quota={ticket.quota}
                description={ticket.description}
              />
            ))}
          </Card>
        </div>
        <div className="flex flex-col w-1/3">
          <OrganizerSection
            id={event?.detail.organizer.id || ""}
            profile_picture={event?.detail.organizer.profile_img || ""}
            organizer_name={event?.detail.organizer.organizer_name || ""}
            email={event?.detail.organizer.description || ""}
          />
        </div>
      </div>
    </main>
  );
};

export default DetailEvent;
