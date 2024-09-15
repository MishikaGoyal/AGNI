import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  const data = await req.json();
  const update = await prisma.schoolUpdates.create({
    data: {
      UDISE_CODE: data.UDISE_CODE,
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
