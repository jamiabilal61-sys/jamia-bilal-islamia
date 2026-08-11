import { NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const checkedAt = new Date().toISOString();

  try {
    const { error } = await adminDb()
      .from("admin_users")
      .select("id", { head: true, count: "exact" })
      .limit(1);

    if (error) throw error;

    return NextResponse.json(
      { status: "ok", database: "connected", checkedAt },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { status: "degraded", database: "unavailable", checkedAt },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
