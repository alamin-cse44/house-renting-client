"use client";

import Shell from "@/components/ui/core/Shell";
import { useUser } from "@/context/UserContext";
import HeroSection from "./home/HeroSection";
import Apartments from "./home/Apartments";

const HomePage = () => {
  const user = useUser();
  // console.log("user : ", user);
  return (
    <Shell className="mt-2">
      <HeroSection />
      <Apartments />
    </Shell>
  );
};

export default HomePage;
