"use client";

import Shell from "@/components/ui/core/Shell";
import { useUser } from "@/context/UserContext";
import HeroSection from "./home/HeroSection";

const HomePage = () => {
  const user = useUser();
  // console.log("user : ", user);
  return (
    <Shell className="mt-2">
      <HeroSection />
    </Shell>
  );
};

export default HomePage;
