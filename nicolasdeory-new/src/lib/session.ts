import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const MEDIA_SESSION_COOKIE = "media_session";

function getSecret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function getSession(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(MEDIA_SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function signSessionToken(): Promise<string> {
  return new SignJWT({ sub: "media-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}
