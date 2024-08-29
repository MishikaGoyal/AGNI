import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error(err);
  }
}
export const config = {
  matcher: ["/protected/:path*", "/api/:path*"],
};
