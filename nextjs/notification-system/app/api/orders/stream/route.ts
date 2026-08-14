import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { logger } from "@/infra/logs/logger";
import { ORDER_EVENTS_CHANNEL } from "@/infra/redis/channels";
import { redisSubscriber } from "@/infra/redis/redis";
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
    async start(controller) {
      controller.enqueue(
        encoder.encode(`event: connected\n` + `data: "connected"\n\n`)
      );

      await redisSubscriber.subscribe(ORDER_EVENTS_CHANNEL);

      const handler = (channel: string, message: string) => {
        logger.debug(message);

        if (channel !== ORDER_EVENTS_CHANNEL) return;

        const event = JSON.parse(message);

        if (event.userId !== user.id) return;

        controller.enqueue(
          encoder.encode(`event: order-status\n` + `data: ${message}\n\n`)
        );
      };

      orderEvents.on("order-status", handler);
      redisSubscriber.on("message", handler);

      req.signal.addEventListener("abort", () => {
        orderEvents.off("order-status", handler);
        redisSubscriber.off("message", handler);
        redisSubscriber.unsubscribe(ORDER_EVENTS_CHANNEL);
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
