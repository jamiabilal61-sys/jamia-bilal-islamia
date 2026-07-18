import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Admission Form:", body);

    return NextResponse.json({
      success: true,
      message: "فارم کامیابی سے موصول ہوگیا۔",
      data: body,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "فارم وصول نہیں ہو سکا۔",
      },
      {
        status: 500,
      }
    );
  }
}