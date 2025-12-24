import { produceOrder } from "@/infra/jobs/order/order-producer";
import { sendOrder } from "@/services/order-producer-service";
import { getUserFromCookie } from "@/utils/cookies";

export async function POST(req: Request) {
  const user = getUserFromCookie(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const order = await sendOrder(req);

  await produceOrder(order);

  return new Response("Order event sent");
}
