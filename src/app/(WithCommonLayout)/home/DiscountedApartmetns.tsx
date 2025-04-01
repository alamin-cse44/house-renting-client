import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListingCard from "@/components/ui/core/ListingCard";
import { getAllListings } from "@/services/ListingService";
import { IListing } from "@/types";

const DiscountedApartmetns = async () => {
  const listings = await getAllListings({"limit": "100"});
  console.log("all listings", listings)
  return (
    <div className="my-16">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Discounted <span className="text-primary">Apartments</span>
        </h2>
      </div>

      {/* Apartments Grid */}
      {listings?.data?.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings?.data
          .map((apartment: IListing) =>
            apartment?.discount > 0 ? (
              <ListingCard listing={apartment} key={apartment?._id} />
            ) : null
          )}
      </div>}

      {/* Button */}
      <div className="flex justify-center mt-6">
        <Link href={"/all-listings"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            All Apartments
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DiscountedApartmetns;
