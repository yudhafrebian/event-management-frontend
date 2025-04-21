import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import * as React from "react";

interface IProfileSectionProps {
  organizer_name: string;
  description: string;
  profile_img: string;
  total_event: number;
}

const ProfileSection: React.FunctionComponent<IProfileSectionProps> = (
  props
) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-6">
          <div>
            <Avatar className="w-24 h-24">
              <AvatarImage src={props.profile_img} alt="Organizer" />
              <AvatarFallback>
                {props.organizer_name.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            <div className="mb-4">
              <h4 className="font-bold text-2xl text-[#1F2937]">
                {props.organizer_name}
              </h4>
              <p className="text-muted-foreground">{props.description}</p>
            </div>
            <div>
              <Badge className="text-sm p-3 rounded-full text-primary bg-[#EEF2FF]">
                Total Events: {props.total_event} Events
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
