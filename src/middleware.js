import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* 
  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err.message);

    return NextResponse.redirect(new URL("/login", req.url));
  } */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path((?!login$).*)",
    "/protected:path*",
    "/principal:path*",
    "/admin:path* ",
  ],
};
