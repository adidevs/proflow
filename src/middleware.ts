import { auth as middleware } from "@/auth";

export default middleware((req) => {
  // if (!req.auth && req.nextUrl.pathname == "/app/:path*") {
  //   const newUrl = new URL("/sign-in", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
  // if (req.auth && (req.nextUrl.pathname == "/sign-in" || req.nextUrl.pathname == "/sign-up")) {
  //   const newUrl = new URL("/app/today", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/sign-in",
    "/sign-up",
    "/app/:path*",
  ],
};

