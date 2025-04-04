import { Button } from "@/components/ui/button";

const GetStartedSection = () => {
  return (
    <div className="px-20 py-16 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
      <div className="text-center">
        <div className="text-white">
          <h1 className="font-bold text-4xl">Ready to Host Your Own Event?</h1>
          <p className="text-xl my-6">
            Join thousands of successful event organizers on our platform
          </p>
        </div>
        <Button variant={"secondary"} className="cursor-pointer" size={"lg"}>
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default GetStartedSection;
