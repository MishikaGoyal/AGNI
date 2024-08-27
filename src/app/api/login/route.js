import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  const { loginId, password } = await req.json();

  if (!loginId || !password) {
    return NextResponse.json({ message: "invalid data" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { loginId } });

  if (!user) {
    return NextResponse.json({ message: "invalid user" }, { status: 401 });
  }
  const verified = await bcrypt.compare(password, user.password);

  if (!verified) {
    return NextResponse.json(
      { message: "incorrect password" },
      { status: 400 }
    );
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const response = NextResponse.json({ message: "succesfully logged in" });
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}

export function GET() {
  return NextResponse.json("hello world");
}
