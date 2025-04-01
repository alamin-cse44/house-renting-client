import Shell from "@/components/ui/core/Shell";
import HeroSection from "./home/HeroSection";
import Apartments from "./home/Apartments";
import ContactSection from "./home/ContactSection";
import TestimonialSection from "./home/TestimonialSection";
import SearchAvailability from "./home/SearchAvailability";
import PosterSection2 from "./home/PosterSection2";
import DiscountedApartmetns from "./home/DiscountedApartmetns";

const HomePage = () => {
  return (
    <Shell className="mt-2">
      <HeroSection />
      <SearchAvailability />
      <Apartments />
      <DiscountedApartmetns />
      <PosterSection2 />
      <TestimonialSection />
      <ContactSection />
    </Shell>
  );
};

export default HomePage;
