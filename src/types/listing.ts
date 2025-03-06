import { IUserDetails } from "./user";

export interface IListing {
    apartmentType: string;
    landLord: IUserDetails;
    location: string;
    description: string;
    price: number;
    bedrooms: number;
    image: {url: string }[];
  }