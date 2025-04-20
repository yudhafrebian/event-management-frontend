import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as React from "react";

interface IOwnerSectionProps {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  email: string;
}

const OwnerSection: React.FunctionComponent<IOwnerSectionProps> = (
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
              <AvatarFallback>{props.first_name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h4 className="font-bold">
              {props.first_name} {props.last_name}
            </h4>
            <p className="text-sm text-muted-foreground">{props.email}</p>
          </div>
        </div>
        <Link href={`/organizers/${props.id}`}>
        <Button className="cursor-pointer" >Contact Owner</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default OwnerSection;
