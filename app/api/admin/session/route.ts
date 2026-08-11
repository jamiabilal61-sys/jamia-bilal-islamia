import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, readAdminSession } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const session = await readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ success: Boolean(session), session });
}
