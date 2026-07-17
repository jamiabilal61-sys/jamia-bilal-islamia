import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;

    const db = client.db("jamia-bilal");

    const result = await db.collection("admissions").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "فارم کامیابی سے محفوظ ہوگیا۔",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "ڈیٹا محفوظ نہیں ہو سکا۔",
      },
      {
        status: 500,
      }
    );
  }
}