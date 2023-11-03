// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const adminPage = [
      "/Report",
      "/Customer",
      "/Items",
      "/Stocks&Expenses",
      "/Accounts",
    ];

    // if (req.nextUrl.pathname.startsWith("/Login") && req.nextauth.token) {
    //   return NextResponse.redirect(new URL("/Dashboard", req.url));
    // }

    // ? THIS WILL DENIED ACCESS IF THE ROLE IS NOT ADMIN
    if (
      adminPage.some((path) => req.nextUrl.pathname.startsWith(path)) &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    // // ? @desc THIS Will allowed the employee only
    // if (
    //   req.nextUrl.pathname.startsWith("/Products") &&
    //   req.nextauth.token?.role !== "employee"
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/POS/:path*",
    "/Delivery/:path*",
    "/Report/:path*",
    "/Customer/:path*",
    "/Items/:path*",
    "/Monitoring/:path*",
    "/Stocks&Expenses/:path*",
    "/Accounts/:path*",
    "/Settings/:path*",
    "/Notifications/:path*",
    "/Page-Template/:path*",
  ],
};
