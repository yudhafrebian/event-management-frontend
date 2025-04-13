import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface IHeroSectionProps {
  background_image: string;
  title: string;
  start_date: Date;
  end_date: Date;
  location: string;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = (props) => {
  return (
    <div className="h-[400px] pt-16">
      <div className="relative w-full h-full">
        <Image
          src={
            props.background_image ||
            "https://img.freepik.com/free-photo/people-festival_1160-736.jpg?t=st=1743755151~exp=1743758751~hmac=940856a732090406bf748cabfd534378778d27005f63ead214f8d5d65c270d0b&w=1060"
          }
          alt={props.title}
          fill
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute top-1/2 bg-primary/70 px-8 py-4 rounded-tr-2xl rounded-br-2xl">
          <h1 className="text-5xl font-bold text-white">{props.title}</h1>
          <div className="flex gap-6 mt-3">
            <div className="flex gap-2">
              <CalendarIcon />
              <p className="text-white">
                {format(props.start_date, "PPP")} -{" "}
                {format(props.end_date, "PPP")}
              </p>
            </div>
            <div className="flex gap-2">
              <MapPin />
              <p className="text-white">{props.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HeroSection;
