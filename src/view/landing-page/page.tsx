import * as React from "react";
import HeroSection from "./section/Hero";
import FeaturedEventSection from "./section/FeaturedEvents";
import CategoriesSection from "./section/Categories";
import GetStartedSection from "./section/GetStarted";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = (props) => {
  return (
    <main>
      <HeroSection />
      <FeaturedEventSection />
      <CategoriesSection />
      <GetStartedSection />
    </main>
  );
};

export default LandingPage;
