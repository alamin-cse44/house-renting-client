import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  landLord: [/^\/landLord/, /^\/create-shop/, /^\/profile/, /^\/listings/],
  tenant: [/^\/tenant/, /^\/profile/],
  admin: [/^\/admin/, /^\/profile/, /^\/listings/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  console.log("user info", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (
    userInfo?.userRole &&
    roleBasedPrivateRoutes[userInfo?.userRole as Role]
  ) {
    const routes = roleBasedPrivateRoutes[userInfo?.userRole as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/profile",
    "/listings",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
