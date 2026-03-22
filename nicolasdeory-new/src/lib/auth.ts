import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyCredentials(user: string, password: string): boolean {
  const u = process.env.MEDIA_ADMIN_USER;
  const p = process.env.MEDIA_ADMIN_PASSWORD;
  if (!u || !p) return false;
  return safeEqual(user, u) && safeEqual(password, p);
}
