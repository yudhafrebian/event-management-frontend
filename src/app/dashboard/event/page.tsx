import DashboardEventView from "@/view/dashboard/events/page";
import * as React from "react";

interface IEventPageProps {}

const EventPage: React.FunctionComponent<IEventPageProps> = (props) => {
  return (
    <div className="pt-20">
      <h1>
        <DashboardEventView />
      </h1>
    </div>
  );
};

export default EventPage;
