import { IListing } from "./listing";
import { IUserDetails } from "./user";

export interface IRentalRequest {
  listing: IListing;
  tenant: IUserDetails;
  landlord: IUserDetails;
  moveInDate: string;
  duration: number;
  rentalStatus: string;
  paymentStatus?: string;
  transactionId?: string;
  landlordPhone?: string;
}
