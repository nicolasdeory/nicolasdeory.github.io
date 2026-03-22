import { NextResponse } from "next/server";

import { MEDIA_SESSION_COOKIE } from "@/lib/session";

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/media", request.url));
  res.cookies.delete(MEDIA_SESSION_COOKIE);
  return res;
}
