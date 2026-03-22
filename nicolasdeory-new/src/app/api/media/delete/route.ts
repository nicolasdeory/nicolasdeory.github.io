import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

const ALLOWED_PREFIX = "photos/";

export async function DELETE(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Blob storage is not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pathname =
    body && typeof body === "object" && "pathname" in body
      ? (body as { pathname: unknown }).pathname
      : undefined;

  if (typeof pathname !== "string" || !pathname.startsWith(ALLOWED_PREFIX)) {
    return NextResponse.json({ error: "Invalid pathname" }, { status: 400 });
  }

  await del(pathname, { token });
  return NextResponse.json({ ok: true });
}
