"use client";

import { apiCall } from "@/utils/apiHelper";
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
    id: string;
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
  };
  totalEvents: number;
}

const DetailOrganizer: React.FunctionComponent<IDetailOrganizerProps> = (
  props
) => {
  const [organizer, setOrganizer] = useState<IDetail | null>(null);
  const getOrganizerDetail = async () => {
    try {
      const organizerId = await props.params;
      const response = await apiCall.get(`/organizers/${organizerId.slug}`);
      console.log(response.data);
      setOrganizer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizerDetail();
  }, []);
  return (
    <main className="px-4 py-8 md:px-24 md:py-20 bg-[#F9FAFB]">
      <ProfileSection
        organizer_name={organizer?.detail.organizer_name || ""}
        description={organizer?.detail.description || ""}
        profile_img={organizer?.detail.profile_img || ""}
        total_event={organizer?.totalEvents || 0}
      />
      <div>
       
      </div>
    </main>
  );
};

export default DetailOrganizer;
