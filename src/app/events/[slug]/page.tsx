"use client";

import { apiCall } from "@/utils/apiHelper";
import AboutSection from "@/view/events/section/About";
import HeroSection from "@/view/events/section/Hero";
import { useEffect, useState } from "react";

interface IDetailEventProps {
  params: Promise<{ slug: string }>;
}

interface IDetail {
  id: string;
  organizer_id: string;
  event_picture: string;
  title: string;
  description: string;
  about: string;
  location: string;
  start_date: Date;
  end_date: Date;
  price: number;
  available_seat: number;
  is_free: boolean;
  category: string;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    email: string;
  };
}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  const [event, setEvent] = useState<IDetail | null>(null);
  const getEventDetail = async () => {
    try {
      const eventId = await props.params;
      console.log(eventId);
      const response = await apiCall.get(`/events/${eventId.slug}`);
      console.log(response.data);

      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventDetail();
  }, []);
  return (
    <main>
      <HeroSection
        background_image={event?.event_picture || ""}
        title={event?.title || ""}
        start_date={event?.start_date || new Date()}
        end_date={event?.end_date || new Date()}
        location={event?.location || ""}
      />
      <div className="flex px-24 py-8">
        <div className="flex flex-col">
          <AboutSection
            about={event?.about || ""}
            seats={event?.available_seat || 0}
            price={event?.price === 0 ? 0 : event?.price || 0}
          />
        </div>
      </div>
    </main>
  );
};

export default DetailEvent;
