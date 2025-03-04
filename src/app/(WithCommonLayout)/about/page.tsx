import Shell from "@/components/ui/core/Shell";
import React from "react";
import Banner from "./Banner";
import WhyUs from "./WhyUs";
import OurSpeciality from "./OurSpeciality";

const AboutPage = () => {
  return (
    <Shell className="mt-2">
      <Banner />
      <WhyUs />
      <OurSpeciality />
    </Shell>
  );
};

export default AboutPage;
