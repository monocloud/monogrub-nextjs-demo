import { authMiddleware } from "@monocloud/auth-nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  protectedRoutes: [
    {
      routes: ["/admin"],
      groups: ["admin"],
    },
  ],
  onGroupAccessDenied: (req) => {
    const url = req.nextUrl.clone();
    url.pathname = "/access-denied";
    return NextResponse.redirect(url);
  },
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
