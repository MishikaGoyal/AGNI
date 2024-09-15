import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json({ message: "No data provided" });
  }
  const response = await fetch("http://127.0.0.1:5000/suggestions", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(data.data),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({
      message: "Error in receiving suggestions from the model",
    });
  }

  const resData = await response.text();

  return NextResponse.json(resData);
}
