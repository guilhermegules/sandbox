"use client";

import { OrderStatusChangedEvent } from "@/domain/order/order-status-changed-event";
import { useEffect, useState } from "react";

export default function Page() {
  const [events, setEvents] = useState<OrderStatusChangedEvent[]>([]);

  useEffect(() => {
    fetch("/api/auth", { method: "POST" });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("/api/orders/stream");

    eventSource.addEventListener("order-status", (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      setEvents((prev) => [...prev, data]);
    });

    eventSource.addEventListener("connected", () => {
      console.log("SSE connected");
      fetch("/api/orders", { method: "POST" });
    });

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>📦 Order Status (SSE)</h1>

      <ul>
        {events.map((event, index) => (
          <li key={`${event.orderId}-${index}`}>
            <strong>{event.status}</strong> – {event.orderId}: {event.timestamp}
          </li>
        ))}
      </ul>
    </main>
  );
}
