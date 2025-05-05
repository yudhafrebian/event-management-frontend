import { Button } from "@/components/ui/button";
import * as React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";

interface IHeroSectionProps {}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = (props) => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-6 pt-2 md:px-20 md:pt-16">
        <div className="py-16 md:py-32 flex flex-col gap-4 md:gap-8">
          <div className="font-bold text-3xl md:text-6xl text-white">
            <h1>Discover Amazing</h1>
            <h1>Events Near You</h1>
          </div>
          <p className=" text-sm md:text-lg text-white md:w-1/2">
            Join thousands of people who trust Event Society for discovering and
            booking the best events.
          </p>
          <div className="flex gap-4">
            <Link href={"/events"}>
            <Button
              className="cursor-pointer"
              variant={"secondary"}
              size={"lg"}
            >
              Browse Events
            </Button>
            </Link>
          </div>
        </div>
      </div>
      <SearchBar />
    </>
  );
};

export default HeroSection;
