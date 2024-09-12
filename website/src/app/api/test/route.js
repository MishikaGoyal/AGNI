import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const UDISE_CODE = await req.json();
    console.log(UDISE_CODE);
    const found = await prisma.school.findUnique({
      where: { UDISE_CODE },
    });
    if (found) {
      return NextResponse.json(
        { message: "school found", payload: found },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "error in finding school" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json("hello world");
}
