import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.formData();

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      cache: "no-store",
      body: data,
    });

    const schoolData = await response.json();

    await prisma.school.create({
      data: {
        UDISE_CODE: schoolData["UDISE CODE"] || "",
        School_Name: schoolData["School name"] || "",
        State: schoolData["State"] || "",
        School_Category: schoolData["School Category"] || "",
        School_Management: schoolData["School Management"] || "",
        School_Type: schoolData["School Type"] || "",
        Grade_Configuration: schoolData["Grade Configuration"] || "",
        Year_of_Establishment: schoolData["Year of Establishment"] || "",
        Boundary_Wall: schoolData["Boundaty Wall"] || false,
        Total_Class_Rooms: schoolData["Total Class Rooms"] || "",
        Library_Available: schoolData["Library Available"] === 1,
        Separate_Room_for_HM: schoolData["Separate Room for HM"] === 1,
        Drinking_Water_Available: schoolData["Drinking Water Available"],
        Playground_Available: schoolData["Playground Available"] === 1,
        Electricity_Availability: schoolData["Electricity Availability"],
        Total_Teachers: schoolData["Total Teachers"] || "",
        Total_Washrooms: schoolData["Total Washrooms"] || "",
        CWSN: schoolData["CWSN"] === 1,
        Total_Students: schoolData["Total Students"],
        Result: schoolData["Result"],
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "unexpected error occured" });
  }
}
