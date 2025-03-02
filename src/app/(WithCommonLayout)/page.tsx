"use client";

import { Button } from "@/components/ui/button";
import Shell from "@/components/ui/core/Shell";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  // console.log("user : ", user);
  return (
    <Shell className="mt-10">
      <Button>Click me</Button>
    </Shell>
  );
};

export default HomePage;
