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