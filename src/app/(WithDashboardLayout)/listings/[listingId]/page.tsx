import UpdateListingForm from '@/components/modules/listing/UpdateListingForm';
import { getSingleListingByAdmin } from '@/services/AdminService';
import React from 'react';

const ListingUpdatePage = async({
    params,
  }: {
    params: Promise<{ listingId: string }>;
  }) => {
    const { listingId } = await params;

    const listing = await getSingleListingByAdmin(listingId);

    console.log("listing id", listing?.data);
    return (
        <div>
            <UpdateListingForm listing={listing?.data} />
        </div>
    );
};

export default ListingUpdatePage;