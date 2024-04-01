// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const adminPage = [
      "/Dashboard",
      "/POS",
      "/Delivery",
      "/Report",
      "/Customer",
      "/Items",
      "/Monitoring",
      "/Stocks&Expenses",
      "/Accounts",
      "/Settings",
      "/Notifications",
      "/Orders",
    ];

    const staffPage = [
      "/Dashboard",
      "/POS",
      "/Delivery",
      "/Monitoring",
      "/Settings",
      "/Notifications",
      "/Orders",
    ];
    const customerPage = [
      "/Client",
      "/MyOrders",
      "/Purchase-History",
      "/MyProfile",
    ];

    // if (req.nextUrl.pathname.startsWith("/Login") && req.nextauth.token) {
    //   return NextResponse.redirect(new URL("/Dashboard", req.url));
    // }

    const pageRoles: any = {
      guest: customerPage,
      admin: adminPage,
      staff: staffPage,
    };

    // Check if the user's role allows access to the current page
    const role = req.nextauth.token?.role;
    const allowedPages = role ? pageRoles[role] : [];
    const isAllowed =
      allowedPages &&
      allowedPages.some((path: any) => req.nextUrl.pathname.startsWith(path));

    // Rewrite the URL if access is denied
    if (!isAllowed) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
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
    "/Client/:path*",
    "/MyOrders/:path*",
    "/Orders/:path*",
    "/MyProfile/:path*",
    "/Purchase-History/:path*",
  ],
};
