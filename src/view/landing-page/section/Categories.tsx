import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Cpu,
  Dumbbell,
  Music,
  Palette,
  Utensils,
} from "lucide-react";
import Link from "next/link";

const CategoriesSection = () => {
  const categories = [
    {
      icon: <Music />,
      title: "Music",
      url: "/events/category/music"
    },
    {
      icon: <Cpu />,
      title: "Tecnology",
      url: "#"
    },
    {
      icon: <Utensils />,
      title: "Culinary",
      url: "#"
    },
    {
      icon: <Palette />,
      title: "Arts",
      url: "#"
    },
    {
      icon: <Dumbbell />,
      title: "Sports",
      url: "#"
    },
    {
      icon: <BookOpen />,
      title: "Education",
      url: "#"
    },
  ];
  return (
    <div className="px-4 py-8 md:py-16 md:px-20 bg-[#F9FAFB]">
      <h1 className="font-bold text-xl md:text-3xl">Browse by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 place-items-center gap-6 md:gap-0 mt-8">
        {categories.map((item, index) => (
          <Link href={item.url} key={index}>
            <div className="flex flex-col gap-2 justify-center items-center rounded-full border h-28 w-28 md:h-32 md:w-32 hover:bg-accent hover:text-primary duration-400">
              {item.icon}
              <p className="font-bold">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
