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
      url: "#"
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
    <div className="py-16 px-20 bg-[#F9FAFB]">
      <h1 className="font-bold text-3xl">Browse by Category</h1>
      <div className="grid grid-cols-6 place-items-center mt-8">
        {categories.map((item, index) => (
          <Link href={item.url} key={index}>
            <div className="flex flex-col gap-2 justify-center items-center rounded-full border h-32 w-32 hover:bg-accent hover:text-primary duration-400">
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
