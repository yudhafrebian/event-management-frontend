import { Button } from "@/components/ui/button";
import Link from "next/link";

const GetStartedSection = () => {
  return (
    <div className="px-4 py-8 md:px-20 md:py-16 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
      <div className="text-center">
        <div className="text-white">
          <h1 className="font-bold text-xl md:text-4xl">Ready to Host Your Own Event?</h1>
          <p className="md:text-xl my-6">
            Join thousands of successful event organizers on our platform
          </p>
        </div>
        <Button variant={"secondary"} className="cursor-pointer" size={"lg"}>
          <Link href={"/sign-up"}>Get Started Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default GetStartedSection;
