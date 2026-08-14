import jwt from "jsonwebtoken";

export async function POST() {
  const token = jwt.sign(
    {
      sub: "user-123",
      email: "user@test.com",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return new Response("Logged in", {
    status: 200,
    headers: {
      "Set-Cookie": `session=${token}; HttpOnly; Path=/; SameSite=Lax`,
    },
  });
}
