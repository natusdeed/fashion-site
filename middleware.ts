import NextAuth from "next-auth";
import authConfig from "@/auth.config";

/** Use Edge-compatible config only (no Prisma). Full auth is in auth.ts */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Allow guest checkout — no login required for /checkout
  if (nextUrl.pathname.startsWith("/checkout")) {
    return;
  }

  const protectedPaths = ["/account/dashboard", "/account/orders", "/account/addresses", "/account/settings", "/account/payment-methods"];
  const isProtected = protectedPaths.some((path) => nextUrl.pathname.startsWith(path));

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", nextUrl.origin);
    loginUrl.searchParams.set("redirect", nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  return;
});

export const config = {
  matcher: [
    "/checkout",
    "/checkout/:path*",
    "/account/dashboard/:path*",
    "/account/orders/:path*",
    "/account/addresses/:path*",
    "/account/settings/:path*",
    "/account/payment-methods/:path*",
  ],
};
