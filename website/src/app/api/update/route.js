import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  const data = await req.json();

  const name = await prisma.school.findUnique({
    where: {
      UDISE_CODE: data.UDISE_CODE,
    },
  });

  if (!name) {
    return NextResponse.json({
      message: "School does not exist in the database",
    });
  }
  const exists = await prisma.schoolUpdates.findUnique({
    where: {
      UDISE_CODE: data.UDISE_CODE,
    },
  });

  if (exists) {
    return NextResponse.json({
      message: "Update request is still pending",
      flag: false,
    });
  }

  await prisma.schoolUpdates.create({
    data: {
      UDISE_CODE: data.UDISE_CODE,
      School_Name: name.School_Name,
      State: data.State,
      Grade_Configuration: data.Grade_Configuration,
      Boundary_Wall: data.Boundary_Wall,
      Total_Class_Rooms: data.Total_Class_Rooms,
      Library_Available: data.Library_Available,
      Separate_Room_for_HM: data.Separate_Room_for_HM,
      Drinking_Water_Available: data.Drinking_Water_Available,
      Playground_Available: data.Playground_Available,
      Electricity_Availability: data.Electricity_Availability,
      Total_Students: data.Total_Students,
      Total_Teachers: data.Total_Teachers,
      Total_Washrooms: data.Total_Washrooms,
      Result: data.Result,
      Verified: false,
    },
  });
  console.log(data);
  return NextResponse.json(
    { message: "Update request sent successfully", flag: true },
    { status: 200 }
  );
}

export async function GET() {
  try {
    const pendingUpdates = await prisma.schoolUpdates.findMany({
      where: {
        Verified: false,
      },
    });
    return NextResponse.json(pendingUpdates);
  } catch (error) {
    return NextResponse.json({ message: "Error in finding data" });
  }
}
