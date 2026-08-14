import { AuthUser, AuthUserJWT } from "@/domain/user/auth-user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function parseCookies(req: Request): Record<string, string> {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) return {};

  return Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [name, ...rest] = cookie.split("=");
      return [name, decodeURIComponent(rest.join("="))];
    })
  );
}

export function getUserFromCookie(req: Request): AuthUser | null {
  const cookies = parseCookies(req);
  const token = cookies["session"];

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthUserJWT;

    return {
      id: payload.sub,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
