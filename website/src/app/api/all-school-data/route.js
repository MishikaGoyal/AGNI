import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return NextResponse.json({ schools });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
