import { NextResponse } from "next/server";

/** Returns which OAuth providers are configured (for conditional UI). */
export async function GET() {
  const googleEnabled =
    !!process.env.AUTH_GOOGLE_ID?.trim() &&
    !!process.env.AUTH_GOOGLE_SECRET?.trim();
  return NextResponse.json({ google: googleEnabled });
}
