import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  const data = await req.json();
  /* const update = await prisma.schoolUpdates.create({
    data: {
      UDISE_CODE: data.UDISE_CODE,
    },
  }); */
  console.log(data);
  return NextResponse.json(
    { message: "Update request sent successfully", flag: true },
    { status: 200 }
  );
}
