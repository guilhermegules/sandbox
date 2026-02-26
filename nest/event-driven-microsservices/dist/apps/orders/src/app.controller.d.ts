import { ClientProxy } from '@nestjs/microservices';
import type { OrderCreatedEvent } from "@common/events";
export declare class AppController {
    private inventoryClient;
    constructor(inventoryClient: ClientProxy);
    createOrder(data: OrderCreatedEvent): Promise<{
        success: boolean;
        message: string;
    }>;
}
