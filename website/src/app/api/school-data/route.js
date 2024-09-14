import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req) {
  const { udiseId } = await req.json();
  const schoolData = await prisma.school.findFirst({
    where: {
      UDISE_CODE: udiseId,
    },
  });

  if (!schoolData) {
    return NextResponse.json(
      { message: "Could not find school" },
      { status: 400 }
    );
  }

  console.log(schoolData);
  return NextResponse.json(
    { message: "School data found ", data: schoolData },
    { status: 200 }
  );
}
