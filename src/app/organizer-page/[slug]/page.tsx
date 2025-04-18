import * as React from "react";

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
  detail_events: {
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
}

const DetailOrganizer: React.FunctionComponent<IDetailOrganizerProps> = (
  props
) => {
  return <main></main>;
};

export default DetailOrganizer;
