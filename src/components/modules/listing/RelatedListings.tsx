import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListingCard from "@/components/ui/core/ListingCard";
import { getAllListings } from "@/services/ListingService";
import { IListing } from "@/types";

const  RelatedListings = async({category}: {category: string}) => {
  const listings = await getAllListings(`category=${category}`);
  // console.log("all listings", listings)
  return (
    <div className="my-16">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase">
          Related <span className="text-primary">{category}</span>
        </h2>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings?.data?.slice(0,5).map((apartment: IListing) => (
          <ListingCard listing={apartment} key={apartment?._id} />
        ))}
      </div>

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
}


export default RelatedListings;