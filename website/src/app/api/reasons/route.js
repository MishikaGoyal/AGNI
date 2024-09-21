import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  if (!data) {
    return NextResponse.json({ message: "No data received" }, { status: 400 });
  }

  const response = await fetch("http://127.0.0.1:5000/reasons", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
    cache: "no-store",
  });
  const resData = await response.json();
  return NextResponse.json(resData);
}
