import Gallery from "@/components/modules/listing/Gallery";
import RentRequestForm from "@/components/modules/listing/RentRequestModal";
import Shell from "@/components/ui/core/Shell";

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  return (
    <Shell className="mt-10">
      <h2>Product details page {listingId}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  my-5">
        {/* Left Side - Image Gallery */}
        <Gallery />

        {/* Right Side - Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 border w-full h-48 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Book This Apartment</h3>
          <RentRequestForm />
        </div>
      </div>
    </Shell>
  );
};

export default ListingDetailsPage;
