import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("jamia-bilal");

    const admissions = await db
      .collection("admissions")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      admissions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "ریکارڈ حاصل نہیں ہو سکے۔",
      },
      {
        status: 500,
      }
    );
  }
}