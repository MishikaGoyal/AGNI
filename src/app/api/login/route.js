import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { loginId, password } = await req.json();

  if (!loginId || !password) {
    return NextResponse.json(
      { message: "Invalid login credentials." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { loginId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ message: "Invalid password." }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const response = NextResponse.json({ message: "Logged in successfully." });
  response.cookies.set("token", token, { httpOnly: true });

  return response;
}
