"use server";

import { IRentalRequest } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create category
export const createRentingRequest = async (data: IRentalRequest) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tenants/requests`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("RENTING");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all RENTAL REQUESTS BY TENANT
export const getAllMyRequests = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tenants/requests?${query}`,
      {
        next: {
          tags: ["RENTING"],
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all RENTAL REQUESTS BY landlord
export const getAllTenantRequests = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests?${query}`,
      {
        next: {
          tags: ["RENTING"],
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("RENTING");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
