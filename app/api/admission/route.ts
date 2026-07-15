import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Admission Form:", body);

  return NextResponse.json({
    success: true,
    message: "فارم کامیابی سے موصول ہوگیا۔",
  });
}