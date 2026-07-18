import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    admissions: [],
    message: "MongoDB ابھی Configure نہیں کی گئی۔",
  });
}