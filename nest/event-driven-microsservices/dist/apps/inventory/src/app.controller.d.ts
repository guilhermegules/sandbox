import type { OrderCreatedEvent } from "@common/events";
export declare class AppController {
    checkStock(data: OrderCreatedEvent): {
        available: boolean;
    };
}
