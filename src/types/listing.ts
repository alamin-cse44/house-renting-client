import { IUserDetails } from "./user";

export interface IListing {
  _id: string;
  apartmentType: string;
  landLord: IUserDetails;
  location: string;
  description: string;
  price: number;
  bedrooms: number;
  image: { url: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
