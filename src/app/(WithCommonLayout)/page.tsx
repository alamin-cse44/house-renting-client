"use client";

import Shell from "@/components/ui/core/Shell";
import { useUser } from "@/context/UserContext";
import HeroSection from "./home/HeroSection";
import Apartments from "./home/Apartments";
import ContactSection from "./home/ContactSection";
import TestimonialSection from "./home/TestimonialSection";

const HomePage = () => {
  const user = useUser();
  // console.log("user : ", user);
  return (
    <Shell className="mt-2">
      <HeroSection />
      <Apartments />
      <TestimonialSection />
      <ContactSection />
    </Shell>
  );
};

export default HomePage;
