// app/middleware.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to all paths except /login
export const config = {
  matcher: "/api/:path*)",
};
