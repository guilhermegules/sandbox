import { simulateOrder } from "@/services/order-producer-service";
import { getUserFromCookie } from "@/utils/cookies";

export async function POST(req: Request) {
  const user = getUserFromCookie(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  simulateOrder(req);

  return new Response("Order started");
}
