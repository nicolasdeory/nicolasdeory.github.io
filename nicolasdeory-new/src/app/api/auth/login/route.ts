import { NextResponse } from "next/server";

import { verifyCredentials } from "@/lib/auth";
import { MEDIA_SESSION_COOKIE, signSessionToken } from "@/lib/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(user, password)) {
    return NextResponse.redirect(new URL("/login?error=1", request.url));
  }

  const token = await signSessionToken();
  const res = NextResponse.redirect(new URL("/media", request.url));
  res.cookies.set(MEDIA_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
