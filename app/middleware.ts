import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPaths = ["/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedPaths.includes(pathname)) {
    const token = req.cookies.get("@token");

    if (!token) {
      const loginUrl = new URL("/", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: protectedPaths,
};
