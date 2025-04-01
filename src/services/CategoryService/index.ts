"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create category
export const createCategory = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllCategories = async (query: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category?${query}`, {
      next: {
        tags: ["CATEGORY"],
      },
    });

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
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};