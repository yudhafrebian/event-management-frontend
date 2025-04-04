import { Button } from "@/components/ui/button";
import * as React from "react";
import SearchBar from "./SearchBar";

interface IHeroSectionProps {}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = (props) => {
  return (
    <>
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-20 pt-16">
      <div className="py-32 flex flex-col gap-8">
        <div className="font-bold text-6xl text-white">
          <h1>Discover Amazing</h1>
          <h1>Events Near You</h1>
        </div>
        <p className="text-lg text-white">
          Join thousands of people who trust EventPro for discovering and
          booking the best events.
        </p>
        <div className="flex gap-4">
          <Button className="cursor-pointer" variant={"secondary"}  size={"lg"}>Browse Events</Button>
          <Button className="cursor-pointer" variant={"outline"}  size={"lg"}>Create Event</Button>
        </div>
      </div>
    </div>
    <SearchBar />
    </>
  );
};

export default HeroSection;
