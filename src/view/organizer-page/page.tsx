"use client";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import CardOrganizer from "@/components/card/cardOrganizer";
import Image from "next/image";

const OrganizerView = () => {
  const [data, setData] = useState<any[]>([]);

  const getAllOrganizer = async () => {
    try {
      const response = await apiCall.get("/organizer/all");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printOrganizer = () => {
    return data.length > 0 ? (
      data.map((item: any) => (
        <div className="grid grid-cols-4 mt-10">
          <CardOrganizer
            key={item.id}
            id={item.id}
            picture={item.event_picture}
            name={item.organizer_name}
            description={item.description}
          />
        </div>
      ))
    ) : (
      <div className="font-bold text-2xl flex flex-col justify-center items-center mt-10">
        <Image
          src={"/assets/undraw_empty_4zx0.png"}
          alt="no data"
          width={300}
          height={300}
        />
        <h1>No Organizer found</h1>
      </div>
    );
  };

  useEffect(() => {
    getAllOrganizer();
  }, []);

  return (
    <main className=" px-4 py-12 md:px-20 md:py-16">
      <div className="mt-4">
        <h1 className="font-bold text-3xl">All Organizer</h1>
      </div>
      <div className="my-5">
        <div className="relative">
          <IoSearch
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            className="pl-8"
            type="search"
            placeholder="Search events..."
          />
        </div>
      </div>
      {printOrganizer()}
    </main>
  );
};

export default OrganizerView;
