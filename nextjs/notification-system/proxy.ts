import { NextResponse } from "next/server";

export default function proxy(req: Request) {
  const cookie = req.headers.get("cookie");

  if (!cookie?.includes("session=")) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/orders/stream"],
};
