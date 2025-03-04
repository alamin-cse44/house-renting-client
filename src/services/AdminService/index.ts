"use server"

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  try {
    const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users`, {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
      },
    });

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const updateUserRole = async (id: string, role:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
      },
      body: JSON.stringify({ role }),
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const blockUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};