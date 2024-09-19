import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { code } = params;
  function removeWhitespaces(str) {
    return str.replace(/\s+/g, "");
  }
  const formattedCode = removeWhitespaces(code);
  console.log(formattedCode);

  const pendingUpdates = await prisma.schoolUpdates.findMany({
    where: {
      Verified: false,
    },
  });

  const filteredData = pendingUpdates.filter(
    (item) => removeWhitespaces(item.UDISE_CODE) === removeWhitespaces(code)
  );
  console.log(filteredData);
  return NextResponse.json(filteredData);
}
