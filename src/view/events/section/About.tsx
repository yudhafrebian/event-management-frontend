import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";

interface IAboutSectionProps {
  description: string;
  seats: number;
  price: any;
}

const AboutSection: React.FunctionComponent<IAboutSectionProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-2xl">About This Event</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="bg-[#EEF2FF] w-1/2 p-4 rounded-xl">
            <h4 className="text-[#4F46E5]">Available Seats</h4>
            <p className="font-bold text-2xl">
              {props.seats}/{props.seats}
            </p>
          </div>
          <div className="bg-[#F5F3FF] w-1/2 p-4 rounded-xl">
            <h4 className="text-primary">Price Range</h4>
            <p className="font-bold text-2xl">
              {props.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
