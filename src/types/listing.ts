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
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const listingCategory = [
  { id: 1, name: "familyHouse" },
  { id: 2, name: "bachelorMess" },
  { id: 3, name: "femaleMess" },
  { id: 4, name: "office" },
  { id: 5, name: "warehouse" },
];
