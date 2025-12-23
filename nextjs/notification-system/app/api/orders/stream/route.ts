import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { orderEvents } from "@/services/order-producer-service";
import { getUserFromCookie } from "@/utils/cookies";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const encoder = new TextEncoder();

  const user = getUserFromCookie(req);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`event: connected\n` + `data: "connected"\n\n`)
      );

      const handler = (event: OrderStatusChangedEvent) => {
        console.log(event);

        if (event.userId !== user.id) return;

        controller.enqueue(
          encoder.encode(
            `event: order-status\n` + `data: ${JSON.stringify(event)}\n\n`
          )
        );
      };

      orderEvents.on("order-status", handler);

      req.signal.addEventListener("abort", () => {
        orderEvents.off("order-status", handler);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
