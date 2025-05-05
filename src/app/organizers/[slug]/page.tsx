"use client";

import CardEvent from "@/components/card/cardEvent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiCall } from "@/utils/apiHelper";
import OwnerSection from "@/view/organizer-page/section/Owner";
import ProfileSection from "@/view/organizer-page/section/Profile";
import { useEffect, useState } from "react";

interface IDetailOrganizerProps {
  params: Promise<{ slug: string }>;
}

interface IDetail {
  detail: {
    id: string;
    organizer_name: string;
    profile_img: string;
    description: string;
    users: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  };
  detailEvents: {
    id: number;
    event_picture: string;
    title: string;
    description: string;
    location: string;
    start_date: Date;
    end_date: Date;
    available_seats: number;
    is_free: boolean;
    category: string;
    ticket_types: {
      id: string;
      type_name: string;
      price: number;
      quota: number;
      description: string;
    }[];
  }[];
  totalEvents: number;
}

const DetailOrganizer: React.FunctionComponent<IDetailOrganizerProps> = (
  props
) => {
  const [organizer, setOrganizer] = useState<IDetail | null>(null);
  const getOrganizerDetail = async () => {
    try {
      const organizerName = await props.params;
      const response = await apiCall.get(`/organizers/${organizerName.slug}`);
      setOrganizer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printEvents = () => {
    if (!organizer || !organizer.detailEvents) {
      return <p>empty</p>;
    }
    
    return organizer.detailEvents.map((item: any) => (
      <CardEvent
        key={item.id}
        id={item.id}
        picture={item.event_picture}
        title={item.title}
        description={item.description}
        location={item.location}
        start_date={new Date(item.start_date)}
        price={item.ticket_types?.[0]?.price || 0}
      />
    ));
  };
  useEffect(() => {
    getOrganizerDetail();
  }, []);
  return (
    <main className="px-4 py-8 md:px-24 md:py-20 pt-20 bg-[#F9FAFB]">
      <ProfileSection
        organizer_name={organizer?.detail.organizer_name || ""}
        description={organizer?.detail.description || ""}
        profile_img={organizer?.detail.profile_img || ""}
        total_event={organizer?.totalEvents || 0}
      />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-xl">Organizer Events</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">{printEvents()}</CardContent>
          </Card>
        </div>
        <div className="flex flex-col md:w-1/3">
          <OwnerSection
            id={organizer?.detail.users.id || ""}
            first_name={organizer?.detail.users.first_name || ""}
            last_name={organizer?.detail.users.last_name || ""}
            profile_picture={organizer?.detail.users.profile_picture || ""}
            email={organizer?.detail.users.email || ""}
          />
        </div>
      </div>
    </main>
  );
};

export default DetailOrganizer;
