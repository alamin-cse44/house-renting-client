import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Listings = () => {
  return (
    <div>
      <div className="flex justify-left mt-6">
        <Link href={"/listings/create-listing"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" />  Create listing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Listings;
