import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";

interface IOrganizerSectionProps {
  organizer_name: string;
  profile_picture: string;
  email: string;
}

const OrganizerSection: React.FunctionComponent<IOrganizerSectionProps> = (
  props
) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-xl">Event Organizer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div>
            <Avatar className="w-12 h-12">
              <AvatarImage src={props.profile_picture} alt="Organizer" />
              <AvatarFallback>{props.organizer_name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h4 className="font-bold">
              {props.organizer_name}
            </h4>
            <p className="text-sm text-muted-foreground">{props.email}</p>
          </div>
        </div>
        <Button className="cursor-pointer" >Visit Organizer</Button>
      </CardContent>
    </Card>
  );
};

export default OrganizerSection;
