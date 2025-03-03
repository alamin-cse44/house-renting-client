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
    </Shell>
  );
};

export default ListingDetailsPage;
