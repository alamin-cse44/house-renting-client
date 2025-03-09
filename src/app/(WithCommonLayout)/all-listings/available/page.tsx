"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IListing } from "@/types";
import { getAllListings } from "@/services/ListingService";
import ListingCard from "@/components/ui/core/ListingCard";
import Shell from "@/components/ui/core/Shell";

const AvailableListaings = () => {
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const cat = searchParams.get("category");
  const sea = searchParams.get("search");

  const fetchListings = async () => {
    setLoading(true); // Show loader before fetching

    try {
      const queryParams: Record<string, string> = {};

      queryParams.category = cat!;
      //   queryParams.search = sea!;

      const query = new URLSearchParams(queryParams).toString();

      const res = await getAllListings(query);

      if (!res) throw new Error("Failed to fetch listings");
      //   console.log(res);

      setListings(res?.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };
  // Fetch listings
  useEffect(() => {
    fetchListings();
  }, []);

  //   console.log("listings", listings);

  return (
    <Shell className="mt-10">
      {!listings.length && <p>No Data to show!!!</p>}
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <div className="space-y-10 mb-10">
          {/* Apartments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {listings?.map((apartment: IListing) => (
              <ListingCard listing={apartment} key={apartment?._id} />
            ))}
          </div>
        </div>
      )}
    </Shell>
  );
};

export default AvailableListaings;
